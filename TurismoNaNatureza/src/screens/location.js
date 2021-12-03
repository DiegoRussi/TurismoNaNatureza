import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ViewPager from '@react-native-community/viewpager';

import styles from '../styles/locationStyles'
import starStyles from '../styles/starStyles'

// import getLocationInfo from '../database/LocationHelper.js'

const Location = ({ location_id, l_title, location}) => {
  console.log("Location DEBUG");
  console.log("location_id = ", location_id);
  console.log("l_title = ", l_title);
  console.log("location = ", location);

  const longitude = location[0];
  const latitude = location[1];
  console.log("longitude = ", longitude);
  console.log("latitude = ", latitude);
  const type = "";
  const title = l_title;
  const desc = "";
  const images =  [ //[ "../assets/empty.jpg" ];
    'https://static01.nyt.com/images/2020/12/10/travel/10europe-02/10europe-02-facebookJumbo.jpg',
    'https://static.educalingo.com/img/en/800/nature.jpg',
    'https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg'
  ];
  const rate = 4;

  // if (!is_add){
  //   const [
  //     latitude, longitude, type, title, desc, images, rate
  //   ] = getLocationInfo(location_id);
  // }

  const [currentLongitude, setCurrentLongitude] = useState(longitude);
  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [locationType, setLocationType] = useState(type);
  const [locationTitle, setLocationTitle] = useState(title);
  const [locationDesc, setLocationDesc] = useState(desc);
  const [locationImages, setLocationImages] = useState(images);
  const [starRate, setStarRate] = useState(rate); 
  const [starRatings, setstarRatings] = useState([1, 2, 3, 4, 5]); 

  const RatingStars = () => { 
    return ( 
      <View style={starStyles.ratingStarsStyle}> 
        {starRatings.map((item, key) => { 
          return ( 
            <TouchableOpacity 
              activeOpacity={0.7} 
              key={item} 
              onPress={() => setStarRate(item)}> 
              <Image 
                style={starStyles.starImageStyle} 
                source={ 
                  item <= starRate 
                    ? require('../assets/star-full.png') 
                    : require('../assets/star-empty.png') 
                } 
              /> 
            </TouchableOpacity> 
          ); 
        })} 
      </View> 
    ); 
  };

  const newLocation = () => {
    console.log("newLocation TO BE IMPLEMENTED");
    console.log("currentLatitude = ", currentLatitude);
    console.log("currentLongitude = ", currentLongitude);
    console.log("locationType = ", locationType);
    console.log("locationTitle = ", locationTitle);
    console.log("locationDesc = ", locationDesc);
    console.log("locationImages = ", locationImages);
    console.log("starRate = ", starRate);
  }

  const shareLocation = () => {
    console.log("TO BE IMPLEMENTED")
  }

  const starLocation = () => {
    console.log("TO BE IMPLEMENTED")
  }

  const openLocationRoute = () => {
    console.log("openLocationRoute")
    Linking.openURL(
      // `http://www.google.com/maps/place/${currentLatitude},${currentLongitude}`
      `https://maps.google.com/?q=${currentLatitude},${currentLongitude}`
    );
  }

  
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    }
  ];

  const Header = () => (
    <View style={styles.subContainer}>
      <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
      <Text style={styles.title}>Coordenadas</Text>
      <Text style={styles.subtitle}>Latitude: {currentLatitude}</Text>
      <Text style={styles.subtitle}>Longitude: {currentLongitude}</Text>
    </View>
  );

  const Type = () => (
    <Picker
      prompt={'Tipo de Local'}
      selectedValue={locationType}
      onValueChange={(itemValue, itemIndex) =>
        setLocationType(itemValue)
      } 
      >
      <Picker.Item label="Selecione o Tipo de Local" value="0" />
      <Picker.Item label="Paisagem" value="paisagem" />
      <Picker.Item label="Fauna" value="fauna" />
      <Picker.Item label="Flora" value="flora" />
      <Picker.Item label="Cachoeiras" value="cachoeiras" />
      <Picker.Item label="Riachos" value="riachos" />
      <Picker.Item label="Montanhas" value="montanhas" />
      <Picker.Item label="Referência para Trilha" value="trilhas" />
    </Picker>
  );

  const Title = () => (
    <View style={styles.form}>
      <TextInput style={styles.text}
        mode="outlined"
        label="Título"
        placeholder="Insira um Título"
        value={locationTitle}
        onChangeText={locationTitle => setLocationTitle(locationTitle)}
      />
    </View>
  );

  const Description = () => (
    <TextInput style={styles.text}
      mode="outlined"
      label="Descrição"
      placeholder="Insira uma Descrição"
      value={locationDesc}
      onChangeText={locationDesc => setLocationDesc(locationDesc)}
      multiline={true}
      numberOfLines={4}
    />
  );

  const Images = () => (
    <View>
      <Text style={starStyles.textStyle}>Imagens</Text>
      <ViewPager
        pageMargin={1}
        style={{ height: 250 }}>
        <View>
          <Image source={{uri: locationImages[0]}} style={{width: 420, height: 250}}/>
        </View>
        <View>
          <Image source={{uri: locationImages[1]}} style={{width: 420, height: 250}}/>
        </View>
        <View>
          <Image source={{uri: locationImages[2]}} style={{width: 420, height: 250}}/>
        </View>
      </ViewPager>
    </View>
  );

  const Stars = () => (
    <SafeAreaView style={starStyles.container}> 
      <View style={starStyles.container}>
        <Text style={starStyles.textStyle}>
          Avaliação: {starRate} / {Math.max.apply(null, starRatings)}
        </Text>
        {RatingStars()}
      </View>
    </SafeAreaView>
  );


  const SaveButton = () => (
    <View style={styles.button}>
      <Button
        title='Salvar'
        onPress={() => newLocation()}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.subContainer}>
        <Header />
      </View>
      <View style={styles.form}>
        <Type />
        <Title />
        <Description />
        <Images />
        <Stars />
        <SaveButton />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <ActionButton buttonColor="rgba(1, 152, 117, 1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Compartilhar" onPress={() => shareLocation()}>
          <Icon name="md-share" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Avaliar" onPress={() => starLocation()}>
          <Icon name="md-star" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Como Chegar" onPress={() => openLocationRoute()}>
          <Icon name="md-map-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => this.props.navigation.navigate('Map')}>
          <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
}

const stylesFAB = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Location;
