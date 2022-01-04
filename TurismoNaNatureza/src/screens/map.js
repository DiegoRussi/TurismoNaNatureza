import React, { useState, useEffect } from "react";

import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Alert
} from "react-native";

import NavigationService from '../helpers/NavigationService.js';

import firestore from '@react-native-firebase/firestore';

import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("pk.eyJ1IjoiZGllZ29tcnVzc2kiLCJhIjoiY2txNzdzcW93MDBzdzJ1czFuYnh1MTd6dSJ9.gyNJSzLJdeUUS0iySzdLhw");

import Geolocation from '@react-native-community/geolocation';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/mapStyles'


const Map = ({device_uid, login}) => {
  console.log("RENDERIZOU Map");
  console.log("device_uid: ", device_uid);
  console.log("login: ", login);

  const [coordinates] = useState([-49.00401,-26.90078]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  // locations database
  const [locationsRef, setLocationsRef] = useState(firestore().collection('locations'));
  const [state, setState] = useState({
    isLoading: true,
    locationsArray: []
  });

  useEffect(() => {
    console.log("useEffect 1");
    return locationsRef.onSnapshot((querySnapshot => {
      getCollection(querySnapshot)
    }));
  }, []);

  const getCollection = (querySnapshot) => {
    const locationsArray = [];
    querySnapshot.forEach((res) => {
      const data = res.data();
      locationsArray.push({
        key: res.id,
        coord_x: data.coord_x,
        coord_y: data.coord_y,
        type: data.type,
        title: data.title
      });
      setState({
        locationsArray: locationsArray,
        isLoading: false,
      });
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
            getLocation(true);
          } else {
            alert('Permissão de Localização negada');
          }
        };
        requestLocationPermission();
      } catch (error) {
        console.log("callLocation error = ", callLocation);
        getLocation(false);
      }
    }
  }

  // Refactor/Rename to getUserLocation
  const getLocation = (enableHighAccuracy=true) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
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
    if (currentLongitude != 0){
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
    return null
  }

  const RenderLocationAnnotations = () => {
    // console.log("state.locationsArray: ", state.locationsArray);
    console.log("state.locationsArray.length: ", state.locationsArray.length);    
    if (state.locationsArray.length != 0){
      // console.log("state.locationsArray[0].key: ", state.locationsArray.length);
      const locationsItems = state.locationsArray.map((location) =>
        <MapboxGL.PointAnnotation
          key={location.key}
          id={location.key}
          title={location.title}
          coordinate={ [location.coord_x.toString(),location.coord_y.toString()] }
          onSelected={() => showAlertLocation(location.key, location.title, location.type)}
          >
        </MapboxGL.PointAnnotation>
      );
      return ( locationsItems )
    }
    return null
  }

  const openLocation = (location_id) => {
    NavigationService.navigate('Location', {location_id: location_id})
  }

  const addLocation = () => {
    console.log("addLocation")
    if (
        currentLatitude != 0 || 
        currentLatitude != "" ||
        currentLongitude != 0 ||
        currentLongitude != ""
      ){
        console.log("currentLatitude: ", currentLatitude);
        console.log("currentLongitude: ", currentLongitude);
        NavigationService.navigate('AddLocation', {location: [currentLongitude, currentLatitude]})
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
        { text: "Visualizar", onPress: () => openLocation(id) }
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
    console.log("useEffect 2");
    callLocation();
    mapCenter();
  }, [currentLongitude]);

  const mapCenter = () => {
    return (
      <MapboxGL.Camera
      zoomLevel={10}
      centerCoordinate={currentLongitude ? [currentLongitude, currentLatitude] : coordinates}
      animationMode={'flyTo'}
      // animationDuration={4200}
      animationDuration={100}
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

          <RenderUserAnnotation />

          <RenderLocationAnnotations />

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
