import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from '@react-navigation/compat';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import home from './pages/home';
import login from './pages/login';
import account from './pages/account';
import alarm from './pages/alarm';
import verifyLogin from './pages/verifyLogin';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

import {Colors} from './config/colors';

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={home}
      />
    </Stack.Navigator>
  );
}
function TabBottom() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Colors.ICONACTIVE}
      inactiveColor={Colors.ICONINACTIVE}
      barStyle={{backgroundColor: Colors.BACKGROUNDTAB}}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={alarm}
        options={{
          tabBarLabel: 'Alarme',
          tabBarIcon: ({color}) => (
            <Icon name="clock-time-eight" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Account"
        component={account}
        options={{
          tabBarLabel: 'Meus Dados',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
const SwitchNavigator = createSwitchNavigator(
  {
    Login: login,
    Home: TabBottom,
    VerifyLogin: verifyLogin
  },
  {
    initialRouteName: 'VerifyLogin',
  },
);
export default function App() {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
}
