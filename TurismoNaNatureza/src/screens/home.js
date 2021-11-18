import React, { Component } from 'react';
import { View, Image, Text, Button } from 'react-native';

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

        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://icon-library.com/images/tourism-icon/tourism-icon-10.jpg'}} />
          <Text style={styles.title}>Turismo Na Natureza</Text>
        </View>

        <View style={styles.content}>
            <Text style={styles.subtitle}>
              Encontre locais como paisagens, fauna, flora,{`\n`}
              cachoeiras, riachos, montanhas e trilhas.
            </Text>
            <Text style={styles.subtitle}>
              Conheça e Crie novos locais facilmente{`\n`}
              para a prática de turismo na natureza!
            </Text>
        </View>

        <View style={styles.button}>
          <Button
            title='Entrar'
            onPress={() => this.props.navigation.navigate('Map', {device_uid: 123456789, login: 987654321})}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='TESTE'
            onPress={() => this.props.navigation.navigate('Location', {device_uid: 123456789, login: 987654321, location_id: 8080})}
          />
        </View>

      </View>
    );
  }
}

export default HomeScreen;