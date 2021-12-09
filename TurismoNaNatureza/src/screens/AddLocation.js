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

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ViewPager from '@react-native-community/viewpager';

import styles from '../styles/locationStyles'
import starStyles from '../styles/starStyles'

// import getLocationInfo from '../database/LocationHelper.js'

const AddLocation = ({ long, lat}) => {
  console.log("AddLocation DEBUG");
  const longitude = long;
  const latitude = lat;
  console.log("longitude = ", longitude);
  console.log("latitude = ", latitude);
  const type = "";
  const title = "";
  const desc = "";
  const imgPlaceholder = {uri: "https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"}
  const images =  [
    imgPlaceholder,
    imgPlaceholder,
    imgPlaceholder
  ];
  const rate = 4;

  // if (!is_add){
  //   const [
  //     latitude, longitude, type, title, desc, images, rate
  //   ] = getLocationInfo(location_id);
  // }

  const [locationLongitude] = useState(longitude);
  const [locationLatitude] = useState(latitude);
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

  const addImages = () => {
    console.log("addImages TO BE IMPLEMENTED");
  }

  const newLocation = () => {
    console.log("newLocation TO BE IMPLEMENTED");
    console.log("locationLatitude = ", locationLatitude);
    console.log("locationLongitude = ", locationLongitude);
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
      // `http://www.google.com/maps/place/${locationLatitude},${locationLongitude}`
      `https://maps.google.com/?q=${locationLatitude},${locationLongitude}`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
          <Text style={styles.title}>Coordenadas</Text>
          <Text style={styles.subtitle}>Latitude: {locationLatitude}</Text>
          <Text style={styles.subtitle}>Longitude: {locationLongitude}</Text>
        </View>

        <View style={styles.form}>

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

          <TextInput style={styles.text}
            mode="outlined"
            label="Título"
            placeholder="Insira um Título"
            value={locationTitle}
            onChangeText={locationTitle => setLocationTitle(locationTitle)}
          />

          <TextInput style={styles.text}
            mode="outlined"
            label="Descrição"
            placeholder="Insira uma Descrição"
            value={locationDesc}
            onChangeText={locationDesc => setLocationDesc(locationDesc)}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.title}>Imagens</Text>
          <ViewPager
            pageMargin={1}
            style={{ height: 250 }}>
            <View>
              <Image source={locationImages[0]} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={locationImages[1]} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={locationImages[2]} style={{width: 420, height: 250}}/>
            </View>
          </ViewPager>

          <Button style={styles.button}
            color="green"
            mode="contained"
            onPress={() => addImages()}
          >
            Adicionar Imagens
          </Button>

          <SafeAreaView style={starStyles.container}>
            <View style={starStyles.container}>
              <Text style={starStyles.textStyle}>
                Avaliação: {starRate} / {Math.max.apply(null, starRatings)}
              </Text>
              {RatingStars()}
            </View>
          </SafeAreaView>

          <Button style={styles.button}
            color="green"
            mode="contained"
            onPress={() => newLocation()}
          >
            Salvar Local
          </Button>

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
        <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => this.props.navigation.navigate('Map')}>
          <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
}

export default AddLocation;
