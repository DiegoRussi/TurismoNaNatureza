import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid
} from "react-native";

import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from '@react-native-community/geolocation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

MapboxGL.setAccessToken("pk.eyJ1IjoiZGllZ29tcnVzc2kiLCJhIjoiY2txNzdzcW93MDBzdzJ1czFuYnh1MTd6dSJ9.gyNJSzLJdeUUS0iySzdLhw");

export default function MapScreen(){

  const [coordinates] = useState([-49.00401,-26.90078]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  
  const callLocation = () => {
    if(Platform.OS === 'ios') { 
      getLocation(); 
    } else { 
      // TODO: improve this request, not working as it should
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
    }
  }
  
  // TODO: Improve this hook
  //  called once
  useEffect(() => { 
    callLocation(); 
  }, []);
  
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
        alert(error.message)
        console.log('getCurrentPosition.error', error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 }
    );
  }
  
  const renderAnnotations = () => {
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
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

  // render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Outdoors}
            zoomLevel={10000}
            centerCoordinate={coordinates}
            showUserLocation={true}>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={coordinates}
              animationMode={'flyTo'}
              animationDuration={10}
            >
            </MapboxGL.Camera>
  
            <MapboxGL.PointAnnotation
              key="userPointAnnotation"
              id="userPointAnnotation"
              coordinate={coordinates}
            />
  
            <View>{renderAnnotations()}</View>
            <View>{renderMarkers()}</View>
  
          </MapboxGL.MapView>
          <ActionButton buttonColor="rgba(1, 152, 117, 1)">
            <ActionButton.Item buttonColor='#9b59b6' title="Adicionar" onPress={() => console.log("clicou em add")}>
              <Icon name="md-location-sharp" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Localizar" onPress={() => callLocation()}>
              <Icon name="md-locate" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'green'
  },
  map: {
    flex: 1
  }
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
