import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../config/colors';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

const modalAlarm = (props) => {
  return (
    <Modal isVisible={true} animationType="slide">
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: '60%',
          borderRadius: 8,
        }}>
        <DatePicker
          date={new Date()}
          onDateChange={() => {}}
          mode="datetime"
          customStyles={{
            dateText: {
              fontSize: 25,
              color: "white",
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default modalAlarm;
