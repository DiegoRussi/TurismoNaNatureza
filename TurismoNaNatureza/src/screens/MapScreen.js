import React, { Component } from "react";

import { View } from "react-native";

import Map from '../screens/Map'
import styles from '../styles/mapStyles'

class MapScreen extends Component {
  constructor(props){
    super(props);
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

    return (
      <View style={styles.page}>
        <View style={styles.container}>

          <Map
            device_uid={device_uid}
            login={login}
          />

        </View>
      </View>
    );
  }
}

export default MapScreen;
