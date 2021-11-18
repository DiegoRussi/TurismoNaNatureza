import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class LocationScreen extends Component {
  static navigationOptions = {
    title: 'Local',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  render() {
    const device_uid = this.props.navigation.getParam('device_uid', '0');
    const login = this.props.navigation.getParam('login', '0');
    const location_id = this.props.navigation.getParam('location_id', '0');
    console.log("device_uid = ", device_uid);
    console.log("login = ", login);
    console.log("location_id = ", location_id);
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 50 }}>Tela LocationScreen</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            title='Voltar'
            onPress={() => this.props.navigation.navigate('Map')}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Button
            title='TESTE'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

      </View>
    );
  }
}

export default LocationScreen