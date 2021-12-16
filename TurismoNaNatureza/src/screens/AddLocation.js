import React, { useState, useEffect } from "react";
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

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ViewPager from '@react-native-community/viewpager';

import styles from '../styles/locationStyles'
import starStyles from '../styles/starStyles'


const AddLocation = ({ location }) => {
  console.log("AddLocation DEBUG");
  const longitude = location[0];
  const latitude = location[1];
  console.log("longitude = ", longitude);
  console.log("latitude = ", latitude);
  const type = "";
  const title = "";
  const desc = "";
  const rate = 4;
  const imgPlaceholder =  {
    imagePath: require("../assets/empty.jpg"),
    fileName: "filename"
  };

  const [locationLongitude] = useState(longitude);
  const [locationLatitude] = useState(latitude);
  const [locationType, setLocationType] = useState(type);
  const [locationTitle, setLocationTitle] = useState(title);
  const [locationDesc, setLocationDesc] = useState(desc);
  const [locationImages, setLocationImages] = useState({
    empty: 3,
    images: [
      imgPlaceholder,
      imgPlaceholder,
      imgPlaceholder
    ]
  });
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
    if (locationImages.empty > 0){
      selectImages()
    } else {
      alert("Selecione apenas 3 fotos!");
    }
  }

  const selectImages = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path:'images', // store camera images under Pictures/images on android
      },
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else if (response.assets.length > 0) {
        let source = response.assets[0];
        console.log('source = ', source);
        let path = source.uri;
        let fileName = getFileName(source.fileName, path);
        setImages(path, fileName)

      } else {
        console.log("deu ruim");
      }
    });
  }

  const setImages = (path, fileName) => {
    console.log("setImages locationImages.empty = ", locationImages.empty);
    let first = locationImages.images[0]
    let second = locationImages.images[1]
    let third = locationImages.images[2]

    if (locationImages.empty == 3){
      setLocationImages({
        empty: 2,
        images: [
          {
            imagePath: path,
            fileName: fileName
          },
          second,
          third
        ]
      });
    } else if (locationImages.empty == 2){
      setLocationImages({
        empty: 1,
        images: [
          first,
          {
            imagePath: path,
            fileName: fileName
          },
          third
        ]
      });
    } else if (locationImages.empty == 1){
      setLocationImages({
        empty: 0,
        images: [
          first,
          second,
          {
            imagePath: path,
            fileName: fileName
          }
        ]
      });
    } else {
      console.log("Selecione apenas 3 fotos");
    }
  }

  const getFileName = (name, path) => {
    if (name != null) { return name; }
    return path.split("/").pop();
  }

  const getURI = (imagePath, pos) => {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: locationImages.images[pos].imagePath };
    }
    return imgSource
  }

  const uploadImageToStorage = (path, imageName) => {
    // setUpload({ isLoading: true });
    let reference = storage().ref(imageName);

    const task = reference.putFile(path);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(() => {
        console.log('Image uploaded to the bucket!');
        // setUpload({ isLoading: false, status: 'Image uploaded successfully' });
    }).catch((e) => {
      // setUpload({ isLoading: false, status: 'Something went wrong :(' });
      alert("Erro no upload de imagens");
      console.log('uploading image error => ', e);
    })
  }

  const savewNewLocation = () => {
    console.log("savewNewLocation TO BE IMPLEMENTED");
    console.log("locationLatitude = ", locationLatitude);
    console.log("locationLongitude = ", locationLongitude);
    console.log("locationType = ", locationType);
    console.log("locationTitle = ", locationTitle);
    console.log("locationDesc = ", locationDesc);
    console.log("locationImages = ", locationImages);
    console.log("starRate = ", starRate);

    Object.values(locationImages.images).forEach(img => {
      if (img.fileName != "filename"){
        uploadImageToStorage(img.imagePath, img.fileName)
      }
    });

    let newLocation = {
      // id: "1",
      coord_x: locationLongitude,
      coord_y: locationLatitude,
      type: locationType,
      title: locationTitle,
      desc: locationDesc,
      images: [ // used fileName as image ref
        locationImages.images[0].fileName,
        locationImages.images[1].fileName,
        locationImages.images[2].fileName,
      ],
      review: starRate,
    }

    saveLocation(newLocation).then(() => {
      console.log('Location added!');
      alert("Local salvo com sucesso!");
      NavigationService.navigate('Map');
    }).catch(error => {
      console.error("Add error: ", error)
      alert("Erro ao salvar novo local");
    });

  }

  const locationsRef = firestore().collection('locations');
  let locationsTotal = 0;
  let locationsId = [];
  let locationsData = [];

  // GET
  async function getLocations() {
    let locations = [];
    await locationsRef.get().then(async querySnapshot => {
      locationsTotal = querySnapshot.size;
      console.log('Total locations: ', locationsTotal);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Location ID: ', documentSnapshot.id, documentSnapshot.data());
        locations.push(documentSnapshot.data());

        locationsId.push(documentSnapshot.id);
        locationsData.push(documentSnapshot.data());
      });
    });
    return locations;
  }

  // ADD
  async function saveLocation(newLocation) {
    console.log("saving newLocation: ", newLocation);
    await locationsRef.add(newLocation);
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
              <Image source={getURI(locationImages.images[0].imagePath, 0)} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={getURI(locationImages.images[1].imagePath, 1)} style={{width: 420, height: 250}}/>
            </View>
            <View>
              <Image source={getURI(locationImages.images[2].imagePath, 2)} style={{width: 420, height: 250}}/>
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
            onPress={() => savewNewLocation()}
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
        <ActionButton.Item buttonColor='#3498db' title="Voltar" onPress={() => NavigationService.navigate('Map')}>
          <Icon name="md-return-up-back-sharp" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
}

export default AddLocation;
