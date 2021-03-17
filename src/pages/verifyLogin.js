import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-community/async-storage';

export default class verifyLogin extends Component {
  async componentDidMount() {
  setTimeout( async() => {
      const cpf = await AsyncStorage.getItem('cpf');
      if(cpf!= null){
        this.props.navigation.navigate('Home')
      }else{
        this.props.navigation.navigate('Login')
      }
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
          <AnimatedLoader
          visible={true}
          overlayColor="transparent"
          source={require('../images/animation/lf30_editor_hrrcmu6q.json')}
          animationStyle={styles.lottie}
          speed={1}>
          </AnimatedLoader>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  lottie: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    flex: 1
  },
});
