import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class home extends Component {
  render() {
    return (
      <View>
        <Text onPress={()=>this.props.navigation.navigate('Login')}> Pagina Inicial </Text>
      </View>
    )
  }
}
