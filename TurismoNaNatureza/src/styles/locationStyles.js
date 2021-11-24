import { StyleSheet } from 'react-native';

const locationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    subContainer: {
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 50,
        height: 50,
    },
    form:{
        backgroundColor: 'white',
    },
    title:{
        color: 'green',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    text: {
        margin: 10
    },
    subtitle:{
        color: 'green',
        textAlign: 'center',
        fontSize: 13,
    },
    star: {
        margin: 20
    },
    button: {
        margin: 20
    }
});

export default locationStyles;