import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from '../styles/homeStyles'

const Home = () => {
  console.log("Home DEBUG");

  // const [state, setState] = useState(0);

  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{uri: 'https://icon-library.com/images/tourism-icon/tourism-icon-10.jpg'}} />
          <Text style={styles.title}>Turismo Na Natureza</Text>
        </View>

        <View style={styles.content}>
            <Text style={styles.subtitle}>
              Encontre locais como paisagens, fauna, flora,{`\n`}
              cachoeiras, riachos, montanhas e trilhas.
            </Text>
            <Text style={styles.subtitle}>
              Conheça e Crie novos locais facilmente{`\n`}
              para a prática de turismo na natureza!
            </Text>
        </View>

    </View>
  );
}

export default Home;
