import { StyleSheet } from 'react-native';

const starStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
  },
  ratingStarsStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 1,
  },
  starImageStyle: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
});

export default starStyles
