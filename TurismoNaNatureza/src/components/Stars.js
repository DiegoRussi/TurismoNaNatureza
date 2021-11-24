import React, {useState} from 'react'; 
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
} from 'react-native'; 

import styles from "../styles/starStyles"

export function Stars() { 
  const [defaultRating, setDefaultRating] = useState(4); 
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]); 

  const RatingStars = () => { 
    return ( 
      <View style={styles.ratingStarsStyle}> 
        {maxRating.map((item, key) => { 
          return ( 
            <TouchableOpacity 
              activeOpacity={0.7} 
              key={item} 
              onPress={() => setDefaultRating(item)}> 
              <Image 
                style={styles.starImageStyle} 
                source={ 
                  item <= defaultRating 
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

  return ( 
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}> 
        <Text style={styles.textStyle}> 
          {defaultRating} / {Math.max.apply(null, maxRating)} 
        </Text>
        <RatingStars /> 
      </View> 
    </SafeAreaView> 
  ); 
};
