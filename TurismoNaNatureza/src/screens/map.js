import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  StyleSheet
} from "react-native";

import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("pk.eyJ1IjoiZGllZ29tcnVzc2kiLCJhIjoiY2txNzdzcW93MDBzdzJ1czFuYnh1MTd6dSJ9.gyNJSzLJdeUUS0iySzdLhw");
import Geolocation from '@react-native-community/geolocation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/mapStyles'

// export function Map(){
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
        alert(error.message)
        console.log('getCurrentPosition.error', error);
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

  const addLocation = () => {
    console.log("clicou em add")
    console.log("TO BE IMPLEMENTED")
  }

  // TODO: Improve this hook; called once
  useEffect(() => { 
    callLocation(); 
  }, []);

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

          <MapboxGL.PointAnnotation
            key="locationPointAnnotation"
            id="locationPointAnnotation"
            coordinate={coordinates}
          />
          {renderUserAnnotation(currentLongitude, currentLatitude)}
        </MapboxGL.MapView>

        <ActionButton buttonColor="rgba(1, 152, 117, 1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Adicionar" onPress={() => addLocation()}>
            <Icon name="md-location-sharp" style={stylesFAB.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Localizar" onPress={() => callLocation()}>
            <Icon name="md-locate" style={stylesFAB.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="TESTE" onPress={() => this.props.navigation.navigate('Location')}>
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
