import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HomeScreen, MapScreen, LocationScreen, AddLocationScreen, ImageScreen } from './src/screens/index';

import NavigationService from './src/helpers/NavigationService';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Map: {
      screen: MapScreen
    },
    Location: {
      screen: LocationScreen
    },
    AddLocation: {
      screen: AddLocationScreen
    },
    ImageScreen: {
      screen: ImageScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const TopLevelNavigator = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <TopLevelNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
