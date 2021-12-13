import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from "react-native";

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

const ImageScreen = () => {

  const [resourcePath, setResourcePath] = useState({
    imagePath: require("../assets/empty.jpg"),
    fileName: "filename"
  })
  const [upload, setUpload] = useState({
    isLoading: false,
    status: ''
  })

  const chooseFile = () => {
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
        setResourcePath({
          imagePath: path,
          fileName: fileName
        });
      } else {
        console.log("deu ruim");
      }
    });
  }

  const getFileName = (name, path) => {
    if (name != null) { return name; }
    return path.split("/").pop();
  }

  const getURI = (imagePath) => {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: resourcePath.imagePath };
    }
    return imgSource
  }

  const uploadFile = () => {
    console.log("uploadFile");
    setUpload({ status: '' });
    let { imagePath } = resourcePath;
    let { fileName } = resourcePath;
    console.log("imagePath = ", imagePath);
    console.log("fileName = ", fileName);
    uploadImageToStorage(imagePath, fileName);
  };

  const uploadImageToStorage = (path, imageName) => {
    setUpload({ isLoading: true });
    let reference = storage().ref(imageName);

    const task = reference.putFile(path);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(() => {
        console.log('Image uploaded to the bucket!');
        setUpload({ isLoading: false, status: 'Image uploaded successfully' });
    }).catch((e) => {
      setUpload({ isLoading: false, status: 'Something went wrong :(' });
      console.log('uploading image error => ', e);
    })
  }

  let { imagePath } = resourcePath;
  let imgSource = getURI(imagePath)
  console.log("upload = ", upload);
  return (
    <SafeAreaView style={styles.container}>
      {upload.isLoading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      }
      <View style={styles.imgContainer}>
        <Text style={styles.boldTextStyle}>{upload.status}</Text>
        <Image style={styles.uploadImage} source={imgSource} />
        <View style={styles.eightyWidthStyle} >
          <Button title={'Select Image'} onPress={chooseFile}></Button>
          <Button title={'Upload Image'} onPress={uploadFile}></Button>
        </View>
        <Image style={styles.remoteImage} source={{uri: 'https://e.snmc.io/i/600/w/2547a82e4787bfa271c2bd9d21db6c75/6323261/jefre-cantu-ledesma-loves-refrain-Cover-Art.jpg'}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#e6e6fa',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  eightyWidthStyle: {
    width: '80%',
    margin: 2,
  },
  uploadImage: {
    width: '80%',
    height: 300,
  },
  remoteImage: {
    width: 50,
    height: 50,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 100
  },
  boldTextStyle: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#5EB0E5',
  }
});


export default ImageScreen;