import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Alert
} from "react-native";

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
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 }
    );
  }

  const renderMarkers = () => {
    const [placeCoordinates] = useState([-49.00478,-26.90564]);
    return (
      <MapboxGL.MarkerView id={"marker"} coordinate={placeCoordinates}>
      <View>
        <View style={stylesMarker.markerContainer}>
          <View style={stylesMarker.textContainer}>
            <Text style={stylesMarker.text}>{"Mirante"}</Text>
          </View>
        </View>
      </View>
      </MapboxGL.MarkerView>
    )
  }

  const renderUserAnnotation = () => {
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

  const renderLocationAnnotations = (locations) => {
    const locationsItems = locations.map((location, index) =>
      <MapboxGL.PointAnnotation
        key={`location${index}`}
        id={`location${index}`}
        title={index}
        coordinate={ location }
        onSelected={() => selectLocation(index, location)}
        >
      </MapboxGL.PointAnnotation>
    );
    return ( locationsItems );
  }

  const locations = [
    [-49.00401,-26.90079], // IFSC
    [-49.00478,-26.90564], // MIRANTE
    [-49.00502,-26.90180], // TESTS
    [-49.00603,-26.90281],
    [-49.00704,-26.90382]
  ];
  //TODO: helpers.getLocationCoords();

  const selectLocation = (title, location) =>{
    console.log("selectLocation TO BE IMPLEMENTED")
    console.log("title = ", title)
    console.log("location = ", location)
    Alert.alert(
      "Local XXX",
      "title = " + title + "\nlocation = " + location,
      [
        {
          text: "Voltar",
          style: "cancel"
        },
        { text: "Visualizar", onPress: () => openLocation() }
      ]
    );
    // openLocation()
  }

  const openLocation = () => {
    console.log("openLocation TO BE IMPLEMENTED")
    NavigationService.navigate('Location', {currentLongitude: currentLongitude, currentLatitude: currentLatitude});
  }

  const addLocation = () => {
    console.log("addLocation TO BE IMPLEMENTED")
    NavigationService.navigate('AddLocation', {currentLongitude: currentLongitude, currentLatitude: currentLatitude});
  }

  // TODO: Improve this hook; called once
  // useEffect(() => { 
  //   callLocation(); 
  // }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
          zoomLevel={10000}
          centerCoordinate={currentLongitude ? [currentLongitude, currentLatitude] : coordinates}
          showUserLocation={true}>
          <MapboxGL.Camera
            zoomLevel={14}
            centerCoordinate={currentLongitude ? [currentLongitude, currentLatitude] : coordinates}
            animationMode={'flyTo'}
            animationDuration={10}
          >
          </MapboxGL.Camera>

          {renderLocationAnnotations(locations)}

          {renderUserAnnotation(currentLongitude, currentLatitude)}

          {renderMarkers()}

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

const stylesMarker = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    width: 60,
    backgroundColor: "transparent",
    height: 70,
  },
  textContainer: {
    backgroundColor: "green",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 5,
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Map;
