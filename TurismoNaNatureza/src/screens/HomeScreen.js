import React, { Component } from 'react';
import { View, Image, Text, Button } from 'react-native';

import Home from '../screens/Home'
import styles from '../styles/homeStyles'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Turismo Na Natureza',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  render() {
    return (
      <View style={styles.container}>

        <Home navigation={this.props.navigation}/>

        <View style={styles.button}>
          <Button
            title='Entrar'
            onPress={() => this.props.navigation.navigate('Map', {device_uid: 123456789, login: 987654321})}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='TESTE'
            // onPress={() => this.props.navigation.navigate('Location', {device_uid: 123456789, login: 987654321, location_id: 8080})}
            onPress={() => this.props.navigation.navigate('ImageScreen')}
          />
        </View>

      </View>
    );
  }
}

export default HomeScreen;
