import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from "../services/api";

// componentes
import Input from '../components/input';

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
    // const data = await AsyncStorage.setItem('togle', JSON.stringify(!togle));
    // fetch(`${api}/session`, {
    //   method: "post",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: 'souza@gmail.com',
    //     password: '1234',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then(async (data) => {
    //     console.log(data)
    //     this.searchPatient(data)
    //   });
    this.setState({isLoading: true});
    this.props.navigation.navigate('Home');
  }
  async searchPatient(data) {
      await fetch(`${api}/search/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          Authorization: data.authorization,
          id: data.id,
          permissions: data.permissions,
        },
        body: JSON.stringify({
          cpf: '073.767.143-24',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // if (data.message) {
          //   alert(data.message);
          // } else {
          //   // console.log(data["parsey_scale"]);
          //   console.log(data)
          // }
        });
  
   
  }

  render() {
    const {cpf, senha, isLoading, visible} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/medical.png')}
          style={{width: '50%', height: 250, marginBottom: 35}}
          resizeMode='contain'
        />
        <Input
          value={cpf}
          onChangeText={(value) => this.setState({cpf: value})}
          textInput="CPF"
          icon="account"
        />
        <Input
          value={senha}
          onChangeText={(value) => this.setState({senha: value})}
          textInput="Senha"
          icon="lock"
        />
        <View style={styles.contRow}>
          <Text style={styles.text}>Esqueceu sua senha?</Text>
          {isLoading ? (
            <ActivityIndicator
              style={{marginRight: 20}}
              color={Colors.BUTTON}
              size="small"
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.tryLogin()}>
              <Icon name="arrow-right" color="#fff" size={22} />
            </TouchableOpacity>
          )}
        </View>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
