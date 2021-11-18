import { StyleSheet } from 'react-native';

const locationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    subContainer: {
        alignItems: 'center',
        margin: 20
    },
    logo: {
        width: 200,
        height: 200,
    },
    content:{
        marginTop: -20,
        paddingHorizontal: 25
    },
    title:{
        color: 'green',
        textAlign: 'center',
        fontSize: 35,
        marginBottom: 16,
    },
    subtitle:{
        color: 'green',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
    },
    button: {
        margin: 20
    }
});

export default locationStyles;