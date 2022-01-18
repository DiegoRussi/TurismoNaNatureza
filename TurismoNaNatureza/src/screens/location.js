import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextInput } from 'react-native-paper';
import ViewPager from '@react-native-community/viewpager';

import Share from 'react-native-share';

import NavigationService from '../helpers/NavigationService.js';

import styles from '../styles/locationStyles'
import starStyles from '../styles/starStyles'

const Location = ({ location_id }) => {
  console.log("Location DEBUG")

  // locations database
  const [locationsRef, setLocationsRef] = useState(firestore().collection('locations'))

  const [state, setState] = useState({
    isLoading: true,
    currentLongitude: "",
    currentLatitude: "",
    locationType: "",
    locationTitle: "",
    locationDesc: "",
  })

  const [locationImage0, setLocationImage0] = useState(require("../assets/empty.jpg"))
  const [locationImage1, setLocationImage1] = useState(require("../assets/empty.jpg"))
  const [locationImage2, setLocationImage2] = useState(require("../assets/empty.jpg"))

  const [starRate, setStarRate] = useState(state.locationStarRate)
  const [starRatings, setstarRatings] = useState([1, 2, 3, 4, 5])

  useEffect(() => {
    return locationsRef.onSnapshot((querySnapshot => {
      getCollection(querySnapshot)
    }))
    
  }, [])

  const getCollection = (querySnapshot) => {
    querySnapshot.forEach((res) => {
      if (res.id == location_id) {
        const data = res.data();
        setState({
            isLoading: false,          
            currentLongitude: data.coord_x,
            currentLatitude: data.coord_y,
            locationType: data.type,
            locationTitle: data.title,
            locationDesc: data.desc,
            locationStarRate: data.review
        });
        setStarRate(data.review);
        data.images.forEach( (img, index) => {
          let ref = storage().ref(img);
          ref.getDownloadURL().then((url) => {
            switch (index) {
              case 0:
                setLocationImage0(url);
                break;
              case 1:
                setLocationImage1(url);
                break;
              case 2:
                setLocationImage2(url);
                break;
              default:
                break;
            }
          }).catch((e) => {
            console.log('getting downloadURL of image error => ', e)
          });
        });
      }
    });
  }

  const RatingStars = () => { 
    return ( 
      <View style={starStyles.ratingStarsStyle}> 
        {starRatings.map((item, key) => { 
          return ( 
            <TouchableWithoutFeedback 
              key={item}> 
              <Image 
                style={starStyles.starImageStyle} 
                source={ 
                  item <= starRate 
                    ? require('../assets/star-full.png') 
                    : require('../assets/star-empty.png') 
                } 
              /> 
            </TouchableWithoutFeedback> 
          ); 
        })} 
      </View> 
    ); 
  };

  const shareLocation = () => {
    let options = {
      title: "Compartilhar Local",
      message: `TurismoNaNatureza\nLocal: ${state.locationTitle}\nTipo: ${state.locationType}\nDescrição: ${state.locationDesc}\nComo Chegar: https://maps.google.com/?q=${state.currentLatitude},${state.currentLongitude}`,
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  const openLocationRoute = () => {
    console.log("openLocationRoute")
    Linking.openURL(
      // `http://www.google.com/maps/place/${currentLatitude},${currentLongitude}`
      `https://maps.google.com/?q=${state.currentLatitude},${state.currentLongitude}`
    );
  }

  const getURI = (imagePath, pos) => {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: imagePath };
    }
    return imgSource
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
          <Text style={styles.title}>Coordenadas</Text>
          <Text style={styles.subtitle}>Latitude: {state.currentLatitude}</Text>
          <Text style={styles.subtitle}>Longitude: {state.currentLongitude}</Text>
        </View>

        <View style={styles.form}>

          <TextInput style={styles.text}
            mode="outlined"
            label="Tipo"
            value={state.locationType}
            editable={false}
          />

          <TextInput style={styles.text}
            mode="outlined"
            label="Título"
            value={state.locationTitle}
            editable={false}
          />

          <TextInput style={styles.text}
            mode="outlined"
            label="Descrição"
            placeholder="Insira uma Descrição"
            value={state.locationDesc}
            editable={false}
            multiline={true}
            numberOfLines={4}
          />

          <SafeAreaView style={starStyles.container}>
            <View style={starStyles.container}>
              <Text style={starStyles.textStyle}>
                Avaliação: {starRate} / {Math.max.apply(null, starRatings)}
              </Text>
              {RatingStars()}
            </View>
          </SafeAreaView>

          <Text style={styles.title}>Imagens</Text>
          <ViewPager
            pageMargin={1}
            style={{ height: 250 }}>
            <View>
              <Image source={getURI(locationImage0)} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={getURI(locationImage1)} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={getURI(locationImage2)} style={{width: 420, height: 250}}/>
            </View>
          </ViewPager>

        </View>
      </ScrollView>

      <ActionButton buttonColor="rgba(1, 152, 117, 1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Compartilhar" onPress={() => shareLocation()}>
          <Icon name="md-share" style={styles.actionButtonIcon} />
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
