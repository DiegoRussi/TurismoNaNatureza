import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Section(children) {
  console.log('DEBUG1: ', children);
  console.log('DEBUG2: ', children.children);
  console.log('DEBUG3: ', JSON.stringify(children));
  console.log('DEBUG4: ', {children});
  console.log('DEBUG5 typeof: ', typeof children);
  // console.log("AAAA ", children.map(child => <View style={styles.section}>{child}</View>))
  return <View style={styles.section}>{children}</View>;
  // return {children.map(child => <View style={styles.section}>{child}</View>)}
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
});
