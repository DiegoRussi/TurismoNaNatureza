import React, { useState, useEffect } from "react";

import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Alert
} from "react-native";

import firestore from '@react-native-firebase/firestore';

import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("pk.eyJ1IjoiZGllZ29tcnVzc2kiLCJhIjoiY2txNzdzcW93MDBzdzJ1czFuYnh1MTd6dSJ9.gyNJSzLJdeUUS0iySzdLhw");
import Geolocation from '@react-native-community/geolocation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import NavigationService from '../helpers/NavigationService.js';
import styles from '../styles/mapStyles'


const Map = () => {
  console.log("RENDERIZOU Map");

  const [coordinates] = useState([-49.00401,-26.90078]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  // locations database
  const [locationsRef, setLocationsRef] = useState(firestore().collection('locations'));
  const [locationsTotal, setLocationsTotal] = useState(0);
  const [locationsId, setLocationsId] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [state, setState] = useState({
    isLoading: true,
    locationsArray: []
  });

  useEffect(() => {
    return locationsRef.onSnapshot((querySnapshot => {
      getCollection(querySnapshot)
    }));
    
  }, []);

  const getCollection = (querySnapshot) => {
    const locationsArray = [];
    querySnapshot.forEach((res) => {
      const data = res.data();
      console.log("getCollection data = ", data);
      locationsArray.push({
        key: res.id,
        coord_x: data.coord_x,
        coord_y: data.coord_y,
        type: data.type,
        title: data.title,
        desc: data.desc,
        images: data.images,
        review: data.review,
      });
      setState({
        locationsArray: locationsArray,
        isLoading: false,
      });
      return 'done';
    });
  }

  // Refactor/Rename to callUserLocation
  const callLocation = () => {
    if(Platform.OS === 'ios') { 
      getLocation(); 
    } else { 
      // TODO: improve this request, not working as it should
      try {
        const requestLocationPermission = async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Permissão de Acesso à Localização",
              message: "Este aplicativo precisa acessar sua localização.",
              buttonNeutral: "Pergunte-me depois",
              buttonNegative: "Cancelar",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            alert('Permissão de Localização negada');
          }
        };
        requestLocationPermission();
      } catch (error) {
      console.log("callLocation error = ", callLocation);
      getLocation();
      }
    }
  }

  // Refactor/Rename to getUserLocation
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        console.log("currentLatitude=",currentLatitude);
        console.log("currentLongitude=",currentLongitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      (error) => {
        alert("Erro: localização do dispositivo não pode ser encontrado, por favor certifique-se de habilitar a localização do dispositivo.")
        console.log('getCurrentPosition.error', error);
        console.log('getCurrentPosition.error.message', error.message);
        setCurrentLatitude(0);
        setCurrentLongitude(0);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 }
    );
  }

  const RenderUserAnnotation = () => {
    return (
      <MapboxGL.PointAnnotation
        key="userPointAnnotation"
        id="userPointAnnotation"
        coordinate={ [currentLongitude, currentLatitude] }>
        <View style={{
          height: 30,
          width: 30, 
          backgroundColor: '#00cccc', 
          borderRadius: 50, 
          borderColor: '#fff', 
          borderWidth: 3
        }} />
      </MapboxGL.PointAnnotation>
    );
  }

  const RenderLocationAnnotations = () => {
    const locationsItems = state.locationsArray.map((location, index) =>
      <MapboxGL.PointAnnotation
        key={location.key}
        id={location.key}
        title={location.title}
        coordinate={ [location.coord_x,location.coord_y] }
        onSelected={() => showAlertLocation(location.key, location.coord_y, location.coord_x, location.title, location.type)}
        >
      </MapboxGL.PointAnnotation>
    );
    return locationsItems;
  }

  // locations hard-coded
  // let locations = [
  //   {
  //     coord_x: -26.90078,
  //     coord_y: -49.00401,
  //     type: "IFSC",
  //     title: "IFSC - Campus Gaspar"
  //   },
  //   {
  //     coord_x: -26.90564,
  //     coord_y: -49.00478,
  //     type: "paisagens",
  //     title: "Mirante no Bela Vista"
  //   },
  // ];

  const openLocation = (title, location, location_id) => {
    NavigationService.navigate('Location', {title: title, location_id: location_id, location: location})
  }

  const addLocation = () => {
    console.log("addLocation")
    if (
        currentLatitude != 0 || 
        currentLatitude != "" ||
        currentLongitude != 0 ||
        currentLongitude != ""
      ){
      NavigationService.navigate('AddLocation', {currentLongitude: currentLongitude, currentLatitude: currentLatitude})
    } else {
      showAlertAddError()
    }
  }

  const showAlertLocation = (id, title, type) => {
    Alert.alert(
      "Visualizar Local",
      "Titulo: " + title + "\nTipo: " + type,
      [
        {
          text: "Voltar",
          style: "cancel"
        },
        { text: "Visualizar", onPress: () => openLocation(title, location, id) }
      ]
    );
  }

  const showAlertAddError = () => {
    Alert.alert(
      "Adicionar Local - Localização",
      "Para criar um novo local, se dirija ao local e ative a Localização do seu dispositivo\nDeseja Localizar agora?",
      [
        {
          text: "Voltar",
          style: "cancel"
        },
        { text: "Localizar", onPress: () => callLocation() }
      ]
    );
  }

  useEffect(() => {
    callLocation();
    mapCenter();
  }, [currentLongitude]);

  const mapCenter = () => {
    return (
      <MapboxGL.Camera
      zoomLevel={10}
      centerCoordinate={currentLongitude ? [currentLongitude, currentLatitude] : coordinates}
      animationMode={'flyTo'}
      animationDuration={4200}
    >
    </MapboxGL.Camera>
    )
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
          zoomLevel={10000}
          centerCoordinate={currentLongitude ? [currentLongitude, currentLatitude] : coordinates}
          showUserLocation={true}>
          {mapCenter()}

          <RenderLocationAnnotations />

          <RenderUserAnnotation />

        </MapboxGL.MapView>

        <ActionButton buttonColor="rgba(1, 152, 117, 1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Adicionar" onPress={() => addLocation()}>
            <Icon name="md-location-sharp" style={stylesFAB.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Localizar" onPress={() => callLocation()}>
            <Icon name="md-locate" style={stylesFAB.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    </View>
  );

}

const stylesFAB = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});


export default Map;
