import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class login extends Component {
  render() {
    return (
      <View>
        <Text
        onPress={()=>this.props.navigation.navigate('Home')}>
          Login
        </Text>
      </View>
    )
  }
}
