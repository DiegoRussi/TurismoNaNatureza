import React, { Component } from 'react';
import { View } from 'react-native';

import Location from '../screens/Location'
import styles from '../styles/locationStyles'

class LocationScreen extends Component {
  static navigationOptions = {
    title: 'Local',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  render() {
    console.log("LocationScreen DEBUG");
    const location_id = this.props.navigation.getParam('location_id', '0')
    console.log("location_id = ", location_id)
    return (
      <View style={styles.container}>

        <Location
          location_id={location_id}
        />

      </View>
    );
  }
}

export default LocationScreen
