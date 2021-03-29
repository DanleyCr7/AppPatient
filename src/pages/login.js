import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { TextInputMask } from "react-native-masked-text";
// componentes
import Input from '../components/input';
import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from '../config/colors';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      senha: '',
      isLoading: false,
      visible: false,
    };
  }
  componentDidMount() {
    // this.tryLogin();
  }
  
  tryLogin() {
    const { cpf, senha } = this.state
    this.setState({isLoading: true})
    fetch(`${api}/verifyuser`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cpf: cpf,
        password: senha,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data)
        if(data.success){
        await AsyncStorage.setItem('cpf', cpf);
        this.props.navigation.navigate('Home')
        this.setState({isLoading: false})

        } else{
          Alert.alert('Falhar', 'Usuario ou senha incorretos')
          this.setState({isLoading: false})
        }
        // console.log(data.message)
      });
   
  }
  auth() {
    this.setState({isLoading: true})
    fetch(`${api}/session`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'souza@gmail.com',
        password: '1234',
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // console.log(data)
       await this.verifyCpf(data)
      });
    // this.setState({isLoading: true});
    // this.props.navigation.navigate('Home');
  }
  async verifyCpf(data){
    const { cpf } = this.state
    await fetch(`${api}/search/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: data.authorization,
        id: data.id,
        permissions: data.permissions,
      },
      body: JSON.stringify({
        cpf: cpf,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if(data.message){
          Alert.alert('Aviso', data.message)
          this.setState({isLoading: false})
        }else{
          await AsyncStorage.setItem('cpf', cpf);
          this.props.navigation.navigate('Home')
          this.setState({isLoading: false})
        }
      });
  }

  render() {
    const {cpf, senha, isLoading, visible} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/medical.png')}
          style={{width: '50%', height: 250, marginBottom: 10}}
          resizeMode="contain"
        />
        <View style={styles.containerIput}>
        <TextInputMask
          type={'cpf'}
          value={this.state.cpf}
          onChangeText={text => {
            this.setState({
              cpf: text
            })
          }}
          placeholder='CPF'
          placeholderTextColor={Colors.TEXTINPUT}
          style={{
            width: '80%',
            color: Colors.TEXTINPUT
          }}
        />

          <Icon name="account" color={Colors.ICON} size={18} />
        </View>
          {isLoading ? (
            <ActivityIndicator
              style={{marginRight: 20}}
              color={Colors.BUTTON}
              size="small"
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.auth()}>
              <Text style={{color: '#fff', fontSize: 16}}>Entrar</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contRow: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.TEXT,
    marginLeft: 4,
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 4,
    backgroundColor: Colors.BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIput:{
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
});
