import React, { Component } from 'react';
import { View } from 'react-native';

import AddLocation from '../screens/AddLocation'
import styles from '../styles/locationStyles'

class AddLocationScreen extends Component {
  static navigationOptions = {
    title: 'Local',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  render() {
    const location = this.props.navigation.getParam('location', '0');
    return (
      <View style={styles.container}>

        <AddLocation 
          location={location}
          />

      </View>
    );
  }
}

export default AddLocationScreen
