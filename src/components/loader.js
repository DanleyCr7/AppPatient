import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import {StyleSheet, Text} from 'react-native';

const loader = (props) => {
  return (
    <AnimatedLoader
      visible={props.visible}
      overlayColor="transparent"
      source={require('../images/animation/36706-loading.json')}
      animationStyle={styles.lottie}
      speed={1}>
        
      </AnimatedLoader>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 150,
    height: 150,
  },
});

export default loader;
