import React, { Component } from 'react';
import { View } from 'react-native';

import { Button } from 'react-native-paper';

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
          <Button style={styles.button}
            color="green"
            mode="contained"
            onPress={() => this.props.navigation.navigate('Map', {device_uid: 123456789, login: 987654321})}
          >
            Entrar
          </Button>
        </View>

      </View>
    );
  }
}

export default HomeScreen;
