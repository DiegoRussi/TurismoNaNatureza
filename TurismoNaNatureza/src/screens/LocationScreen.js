import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
    console.log("location_id = ", location_id);
    return (
      <View style={styles.container}>

        <Location location_id={location_id} />

        <ActionButton buttonColor="rgba(1, 152, 117, 1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Compartilhar" onPress={() => shareLocation()}>
            <Icon name="md-share" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Avaliar" onPress={() => starLocation()}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Rota" onPress={() => openRouteLocation()}>
            <Icon name="md-map-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => this.props.navigation.navigate('Map')}>
            <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

const stylesFAB = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

function shareLocation(){
  console.log("TO BE IMPLEMENTED")
}

function starLocation(){
  console.log("TO BE IMPLEMENTED")
}

function openRouteLocation(){
  console.log("TO BE IMPLEMENTED")
}

export default LocationScreen
