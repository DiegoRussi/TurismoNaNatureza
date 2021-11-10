import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 50 }}>Tela MapScreen</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            title='Ir para Tela Location'
            onPress={() => this.props.navigation.navigate('Location')}
          />
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

export default MapScreen