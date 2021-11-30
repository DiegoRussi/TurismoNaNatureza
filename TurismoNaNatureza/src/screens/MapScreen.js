import React, { Component } from "react";

import { View } from "react-native";

import Map from '../screens/Map'
import styles from '../styles/mapStyles'

class MapScreen extends Component {
  constructor(props){
    super(props);
    this.state = {count: 0};
    this.coordinates = [-49.00401,-26.90078];
    this.currentLatitude = 0;
    this.currentLongitude = 0;
  }

  static navigationOptions = {
    title: 'Localidades',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  render() {
    console.log("RENDERIZOU MapScreen");

    const device_uid = this.props.navigation.getParam('device_uid', '0');
    const login = this.props.navigation.getParam('login', '0');
    const location_id = this.props.navigation.getParam('location_id', '0');
    console.log("device_uid = ", device_uid);
    console.log("login = ", login);
    console.log("location_id = ", location_id);

    return (
      <View style={styles.page}>
        <View style={styles.container}>

          <Map />

        </View>
      </View>
    );
  }
}

export default MapScreen;
