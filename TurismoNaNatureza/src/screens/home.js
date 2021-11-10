import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 50 }}>Tela Inicial</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            title='Entrar'
            onPress={() => this.props.navigation.navigate('Map')}
          />
        </View>

      </View>
    );
  }
}

export default HomeScreen;