import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';

import NavigationService from '../helpers/NavigationService.js';

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

  // const [
  //   latitude, longitude, type, title, desc, images, rate
  // ] = getLocationInfo(location_id);

  const longitude = location[0];
  const latitude = location[1];
  const type = "cachoeiras";
  const title = l_title;
  const desc = "TESTE";
  const images =  [
    'https://static01.nyt.com/images/2020/12/10/travel/10europe-02/10europe-02-facebookJumbo.jpg',
    'https://static.educalingo.com/img/en/800/nature.jpg',
    'https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg'
  ];
  // const imgPlaceholder = {uri: "https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"}
  // const images =  [
  //   imgPlaceholder,
  //   imgPlaceholder,
  //   imgPlaceholder
  // ];
  const rate = 4;
  console.log("longitude = ", longitude);
  console.log("latitude = ", latitude);
  console.log("type = ", type);
  console.log("title = ", title);
  console.log("desc = ", desc);
  console.log("images = ", images);
  console.log("rate = ", rate);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
          <Text style={styles.title}>Coordenadas</Text>
          <Text style={styles.subtitle}>Latitude: {currentLatitude}</Text>
          <Text style={styles.subtitle}>Longitude: {currentLongitude}</Text>
        </View>

        <View style={styles.form}>

          <TextInput style={styles.text}
            mode="outlined"
            label="Tipo"
            value={locationType}
            editable={false}
          />

          <TextInput style={styles.text}
            mode="outlined"
            label="Título"
            value={locationTitle}
            editable={false}
          />

          <TextInput style={styles.text}
            mode="outlined"
            label="Descrição"
            placeholder="Insira uma Descrição"
            value={locationDesc}
            editable={false}
            multiline={true}
            numberOfLines={4}
          />

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

          <SafeAreaView style={starStyles.container}>
            <View style={starStyles.container}>
              <Text style={starStyles.textStyle}>
                Avaliação: {starRate} / {Math.max.apply(null, starRatings)}
              </Text>
              {RatingStars()}
            </View>
          </SafeAreaView>

        </View>
      </ScrollView>

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
        <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => NavigationService.navigate('Map')}>
          <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
}

export default Location;
