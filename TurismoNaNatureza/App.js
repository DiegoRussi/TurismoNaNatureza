import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

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

const AppNavigator = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Map: {
      screen: MapScreen
    },
    Location: {
      screen: LocationScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
