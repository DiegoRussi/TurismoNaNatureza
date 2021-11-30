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
    const location_id = this.props.navigation.getParam('location_id', '0');
    const currentLongitude = this.props.navigation.getParam('currentLongitude, ', '0');
    const currentLatitude = this.props.navigation.getParam('currentLatitude', '0');
    console.log("location_id = ", location_id);
    console.log("currentLongitude = ", currentLongitude);
    console.log("currentLatitude = ", currentLatitude);
    return (
      <View style={styles.container}>

        <Location 
          is_add={true}
          location_id={location_id} 
          lat={currentLatitude}
          long={currentLongitude}
          />

      </View>
    );
  }
}

export default LocationScreen
