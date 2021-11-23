import React, { useState } from "react";
import { View, Text, Image } from 'react-native';

import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ViewPager from '@react-native-community/viewpager';

import styles from '../styles/locationStyles'

export function Location ({ location_id, ...inputProps }) {
  console.log("Location DEBUG");
  console.log("location_id = ", location_id);

  const [coordinates] = useState([-49.00401,-26.90078]);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [locationTitle, setLocationTitle] = useState();
  const [locationDesc, setLocationDesc] = useState();
  const [locationImages, setLocationImages] = useState([
      'https://static01.nyt.com/images/2020/12/10/travel/10europe-02/10europe-02-facebookJumbo.jpg',
      'https://static.educalingo.com/img/en/800/nature.jpg',
      'https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg'
    ]);
  const [locationStars, setLocationStars] = useState();

  return (
    <View style={styles.container}>

      <View style={styles.subContainer}>
        <Image style={styles.logo} source={{uri: 'https://www.iconsdb.com/icons/preview/green/map-marker-xxl.png'}} />
        <Text style={styles.title}>Coordenadas</Text>
        <Text style={styles.subtitle}>Latitude: {currentLatitude}</Text>
        <Text style={styles.subtitle}>Longitude: {currentLongitude}</Text>
      </View>

      <View style={styles.form}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
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
          value={locationTitle ? locationTitle : ""}
          // onSubmitEditing={(value) => setLocationTitle(value.nativeEvent.text)}
        />

        <TextInput style={styles.text}
          label="Descrição"
          value={locationDesc ? locationDesc : ""}
          multiline={true}
          numberOfLines={4}
        />

        <ViewPager
          pageMargin={20}
          style={{ height: 150 }}>
          <View>
            <Image source={{uri: locationImages[0]}} style={{width: 420, height: 170}}/>
          </View>
          <View>
            <Image source={{uri: locationImages[1]}} style={{width: 420, height: 170}}/>
          </View>
          <View>
            <Image source={{uri: locationImages[2]}} style={{width: 420, height: 170}}/>
          </View>
        </ViewPager>

        <TextInput style={styles.text}
          label="Avaliação"
          value={locationStars}
        />

      </View>

    </View>
  );
}