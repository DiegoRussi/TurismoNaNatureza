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
    const title = this.props.navigation.getParam('title', '')
    const location = this.props.navigation.getParam('location', '0')
    console.log("location_id = ", location_id)
    console.log("title = ", title)
    console.log("location = ", location)
    return (
      <View style={styles.container}>

        <Location
          l_title={title}
          location_id={location_id}
          location={location}
          />

      </View>
    );
  }
}

export default LocationScreen
