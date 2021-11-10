import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class LocationScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 50 }}>Tela LocationScreen</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            title='Voltar'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

      </View>
    );
  }
}

export default LocationScreen