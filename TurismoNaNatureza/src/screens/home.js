import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

class HomeScreen extends Component {
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
            onPress={() => this.props.navigation.navigate('Map')}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    margin: 20
  },
  logo: {
    width: 200,
    height: 200,
  },
  content:{
      marginTop: -20,
      paddingHorizontal: 25
  },
  title:{
      color: 'green',
      textAlign: 'center',
      fontSize: 35,
      marginBottom: 16,
  },
  subtitle:{
      color: 'green',
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 10,
  },
  button: {
    margin: 20
  }
});

export default HomeScreen;