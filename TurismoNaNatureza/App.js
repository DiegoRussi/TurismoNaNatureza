import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {HomeScreen, MapScreen, LocationScreen} from './src/screens/index';

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
