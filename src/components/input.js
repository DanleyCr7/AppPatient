import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../config/colors'
const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.textInput}
        placeholderTextColor={Colors.TEXTINPUT}
        secureTextEntry={props.isPassword}
      />
      <Icon name={props.icon} color={Colors.ICON} size={18} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
   flexDirection: 'row',
   backgroundColor: Colors.BACKGROUNDINPUT,
   width: '80%',
   height: 40,
   borderRadius: 5,
   marginBottom: 30,
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingHorizontal: 10
  },
  textInput:{
    width: '80%',
    color: Colors.TEXTINPUT
  }
})
export default Input;

