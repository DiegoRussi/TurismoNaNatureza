import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import ViewPager from '@react-native-community/viewpager';

// import Section from '../components/Section'
// import SectionFlex from '../components/SectionFlex'
import styles from '../styles/locationStyles'

class LocationScreen extends Component {
  constructor(props){
    super(props);
    this.state = {count: 0};
    this.coordinates = [-49.00401,-26.90078];
    this.currentLatitude = 0;
    this.currentLongitude = 0;
    this.selectedType = "";
  }

  static navigationOptions = {
    title: 'Local',
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: '#fff'
  };

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  render() {
    const location_id = this.props.navigation.getParam('location_id', '0');
    console.log("location_id = ", location_id);

    return (
      <View style={styles.container}>

        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
          <Text style={styles.title}>Coordenadas</Text>
          <Text style={styles.subtitle}>Latitude</Text>
          <Text style={styles.subtitle}>Longitude</Text>
        </View>

        <View style={styles.form}>
          <Picker
            selectedValue={this.selectedType}
            onValueChange={(itemValue, itemIndex) =>
              this.selectedType = itemValue
            }>
            <Picker.Item label="Paisagem" value="paisagem" />
            <Picker.Item label="Fauna" value="fauna" />
            <Picker.Item label="Flora" value="flora" />
            <Picker.Item label="Cachoeiras" value="cachoeiras" />
            <Picker.Item label="Riachos" value="riachos" />
            <Picker.Item label="Montanhas" value="montanhas" />
            <Picker.Item label="Referência para Trilha" value="trilhas" />
          </Picker>

          <TextInput style={styles.text}
            label="Título"
            value={"Título"}
          />

          <TextInput style={styles.text}
            label="Descrição"
            value={"Descrição"}
            multiline={true}
            numberOfLines={4}
          />

          <ViewPager
            pageMargin={20}
            style={{ height: 150 }}>
            <View>
              <Image source={{uri: 'https://t.tudocdn.net/404353?w=980&h=340'}} style={{width: 420, height: 170}}/>
            </View>
            <View>
              <Image source={{uri: 'https://t.tudocdn.net/404287?w=980&h=340'}} style={{width: 420, height: 170}}/>
            </View>
            <View>
              <Image source={{uri: 'https://t.tudocdn.net/404001?w=980&h=340'}} style={{width: 420, height: 170}}/>
            </View>
          </ViewPager>

          <TextInput style={styles.text}
            label="Avaliação"
            value={"Avaliação"}
          />                            
        </View>

        <ActionButton buttonColor="rgba(1, 152, 117, 1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Compartilhar" onPress={() => shareLocation()}>
            <Icon name="md-share" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Avaliar" onPress={() => starLocation()}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Rota" onPress={() => openRouteLocation()}>
            <Icon name="md-map-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => this.props.navigation.navigate('Map')}>
            <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

function shareLocation(){
  console.log("TO BE IMPLEMENTED")
}

function starLocation(){
  console.log("TO BE IMPLEMENTED")
}

function openRouteLocation(){
  console.log("TO BE IMPLEMENTED")
}

export default LocationScreen