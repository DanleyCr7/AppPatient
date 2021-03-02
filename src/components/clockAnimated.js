import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from 'react-native';
const {width} = Dimensions.get('screen');
const SIZE = width * 0.9;

const clockAnimated= (props) =>{
  const rotateSecods = '11deg';
  const transformSeconds = {
    transform: [{rotate: props.rotateSeconds}],
  };
  const rotateMinutes = '125deg';
  const transformMinutes = {
    transform: [{rotate: rotateMinutes}],
  };
  const rotateHours = '25deg';
  const transformHours = {
    transform: [{rotate: rotateHours}],
  };
  return (
    <View style={styles.containerClock}>
      <View elevation={5} style={[styles.bigQuadran]}>
        <View style={[styles.mediumQuadran]}>
      <View style={[styles.smallQuadran]}/>

        </View>
      </View>
      <Animated.View style={[styles.mover, transformHours]}>
        <View style={[styles.hours]} />
      </Animated.View>
      <Animated.View style={[styles.mover, transformMinutes]}>
        <View style={[styles.minutes]} />
      </Animated.View>
      <Animated.View style={[styles.mover, transformSeconds]}>
        <View style={[styles.seconds]} />
      </Animated.View>

    </View>
  );
};
const styles = StyleSheet.create({
  containerClock: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    width: '100%'
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '35%',
    marginTop: '15%',
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '45%',
    marginTop: '5%',
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: 'rgba(227,71,134,1)',
    height: '50%',
    marginTop: '5%',
    width: 2,
    borderRadius: 2,
  },
  bigQuadran: {
    width: SIZE * 0.7,
    height: SIZE * 0.7,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200,200,200,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // position: 'absolute',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(227,71,134,1)',
    position: 'relative',
    marginTop: 15
  },
});
export default clockAnimated;
