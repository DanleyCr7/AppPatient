import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../config/colors';
import ReactNativeAN from 'react-native-alarm-notification';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import {Switch} from 'react-native-paper';
import dayjs from 'dayjs';
import Clock from '../components/clockAnimated';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
// import ModalAlarm from '../components/modalAlarm'
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import AlarmClock from 'react-native-alarm-clock';

// const twoHoursBefore = new Date();
const fireDate = '28-02-2021 18:30:00';
const alarmNotifData = {
  title: 'Hora de tomar seu remédio',
  message: 'Oi Bernada, não esqueça de tomar seu remedio ;)',
  channel: 'my_channel_id',
  small_icon: 'ic_launcher',
  has_button: true,
  schedule_type: 'repeat',
  repeat_interval: 'daily',
  // You can add any additional data that is important for the notification
  // It will be added to the PendingIntent along with the rest of the bundle.
  // e.g.
  data: {foo: 'bar'},
};
const TICK_INTERVAL = 1000;
const {width} = Dimensions.get('screen');
const SIZE = width * 0.9;
const now = moment();
export default class alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togle: false,
      index: new Animated.Value(0),
      tick: new Animated.Value(0),
      hour: now.format('HH:mm:ss'),
      alarm: '00:00:00',
      isModal: false,
      date: new Date(),
    };
  }
  _timer = 0;
  _ticker = null;
  async componentDidMount() {
    const togle = await AsyncStorage.getItem('togle');
    const alarm = await AsyncStorage.getItem('alarm');
    // const now = moment().format(`DD-MM-YYYY `)

    await this.setState({togle: JSON.parse(togle), alarm: JSON.parse(alarm)});

    // // console.log(JSON.parse(togle))

    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');
    const oneDay = 24 * 60 * 60;
    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this._animate();

    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
      this.setState({hour: now.format('HH:mm:ss')});
    }, TICK_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this._ticker);
    this._ticker = null;
  }
  _animate() {
    Animated.timing(this.state.index, {
      toValue: this.state.tick,
      duration: TICK_INTERVAL / 2,
      useNativeDriver: true,
    }).start();
  }
  async clock() {
    try {
      const {togle} = this.state;

      await this.setState({togle: !togle});

      if (!togle) {
        await this.alarmEnable();
      } else {
        await this.cancelAlarm();
      }
      await AsyncStorage.setItem('togle', JSON.stringify(!togle));

    } catch (error) {
      console.log(error);
    }
  }
  async alarmEnable() {
    const {alarm} = this.state;
    const hourActual = moment().format(`HH:mm`);

    const beginningTime = moment(alarm, 'HH:mm');
    const endTime = moment(hourActual, 'HH:mm');
    const plusDay = moment().format(`DD-MM-YYYY ${this.state.alarm}`);
    if (endTime.isBefore(beginningTime)) {
      const alarmOne = await ReactNativeAN.scheduleAlarm({
        ...alarmNotifData,
        fire_date: moment().format(`DD-MM-YYYY ${alarm} a`),
      });
      await AsyncStorage.setItem('idAlarm', JSON.stringify(alarmOne.id));
      console.log(alarmOne.id);
      // console.log(moment().format(`DD-MM-YYYY ${alarm} a`))
    } else {
      const alarm2 = await ReactNativeAN.scheduleAlarm({
        ...alarmNotifData,
        fire_date: moment(plusDay, 'DD-MM-YYYY HH:mm:ss a')
          .add(1, 'days')
          .format('DD-MM-YYYY HH:mm:ss'),
      });
      await AsyncStorage.setItem('idAlarm', JSON.stringify(alarm2.id));
      console.log(alarm2.id);

      console.log(
        moment(plusDay, 'DD-MM-YYYY HH:mm:ss a')
          .add(1, 'days')
          .format('DD-MM-YYYY HH:mm:ss'),
      );
    }
    ToastAndroid.showWithGravity(
      `Alarme ativado`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }
  async cancelAlarm() {
    const idAlarm = await AsyncStorage.getItem('idAlarm');
    const id = JSON.parse(idAlarm);
    console.log(id);

    ReactNativeAN.deleteAlarm(id);
    ReactNativeAN.deleteRepeatingAlarm(id);
    await ReactNativeAN.stopAlarmSound();
    await ReactNativeAN.removeAllFiredNotifications();
    ToastAndroid.showWithGravity(
      `Alarme desativado`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }
  async defineAlarm() {
    // const idAlarm = await AsyncStorage.getItem('idAlarm');
    // const id = JSON.parse(idAlarm)
    // console.log(id)

    // ReactNativeAN.deleteAlarm(id)
    // ReactNativeAN.deleteRepeatingAlarm(id);

    const alarm = moment(this.state.date).format('HH:mm:ss');

    await this.setState({isModal: !this.state.isModal, alarm: alarm});
    await AsyncStorage.setItem('alarm', JSON.stringify(alarm));
    ToastAndroid.showWithGravity(
      `Alarme definido`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    console.log(alarm);
  }
  isModal() {
    this.setState({isModal: !this.state.isModal});
  }
  // showToastWithGravity(){

  // };
  render() {
    const {index, isModal, date} = this.state;
    const interpoleted = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    };
    const secondDegress = Animated.multiply(index, 6);
    const transformSeconds = {
      transform: [{rotate: secondDegress.interpolate(interpoleted)}],
    };
    const rotateMinutes = Animated.divide(
      secondDegress,
      new Animated.Value(60),
    );
    const transformMinutes = {
      transform: [{rotate: rotateMinutes.interpolate(interpoleted)}],
    };
    const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
    const transformHours = {
      transform: [{rotate: rotateHours.interpolate(interpoleted)}],
    };
    return (
      <View style={styles.container}>
        {/* alarme */}
        <Modal isVisible={isModal} animationType="slide">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: '60%',
              borderRadius: 8,
            }}>
            <DatePicker
              date={date}
              onDateChange={(date) => {
                this.setState({date: date});
              }}
              mode="time"
              style={{marginBottom: 30}}
              customStyles={{
                dateText: {
                  fontSize: 25,
                  color: 'white',
                },
              }}
            />
            <View
              style={{
                width: '60%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: -50,
              }}>
              <TouchableOpacity
                style={styles.alarmDefineButton}
                onPress={() => this.defineAlarm()}>
                <Icon
                  name="check-circle-outline"
                  color={Colors.BACKGROUNDTAB}
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alarmDefineButton}
                onPress={() => this.isModal()}>
                <Icon name="close" color={Colors.BACKGROUNDTAB} size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* alarme */}
        {/* Animação do relogio */}
        <View style={styles.containerClock}>
          <View elevation={5} style={[styles.bigQuadran]}>
            <View style={[styles.mediumQuadran]}>
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
            {/* <View style={[styles.smallQuadran]} /> */}
          </View>

          <Text style={styles.textAlarm}>{this.state.hour}</Text>
        </View>
        {/* Animação do relogio */}
        <View style={styles.contListAlarms}>
          <View style={styles.buttonPlus}>
            <Icon name="bell-ring" color="#fff" size={28} />
            {/* bell-ring */}
          </View>
          {/*  */}
          <View style={styles.listAlarms}>
            <Text style={styles.hourAlarm}>{this.state.alarm}</Text>
            <View style={{alignItems: 'flex-end'}}>
              {/*  */}
              <View style={styles.viewIcons}>
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => this.isModal()}>
                  <Icon name="square-edit-outline" color="#fff" size={22} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonDelete}>
                  <Icon name="delete" color="#fff" size={22} />
                </TouchableOpacity> */}
              </View>
              {/*  */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[styles.daySelect, {color: Colors.ROSE}]}>D</Text>
                <Text style={[styles.daySelect, {color: Colors.ROSE}]}>D</Text>
                <Text style={[styles.daySelect, {color: '#fff'}]}>D</Text>
                <Text style={[styles.daySelect, {color: '#fff'}]}>D</Text>
                <Text style={[styles.daySelect, {color: Colors.ROSE}]}>D</Text>
                <Text style={[styles.daySelect, {color: '#fff'}]}>D</Text>
                <Switch
                  value={this.state.togle}
                  onValueChange={() => this.clock()}
                  trackColor={{false: '#767577', true: '#FF2982'}}
                  thumbColor={this.state.togle ? '#fff' : '#fff'}
                  style={{
                    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                    marginTop: 5,
                    marginLeft: 12,
                  }}
                />
              </View>
            </View>
            {/*  */}
          </View>
          <View
            style={{
              width: '90%',
              height: 10,
              borderBottomColor: '#fff',
              borderBottomWidth: 0.3,
              alignSelf: 'center',
              marginTop: 5,
            }}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    alignItems: 'center',
    flex: 1,
  },
  containerClock: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    width: '100%',
  },
  textAlarm: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.BACKGROUNDALARM,
    fontFamily: 'italic',
    marginTop: 35,
  },
  contListAlarms: {
    width: '100%',
    height: '34%',
    backgroundColor: Colors.BACKGROUNDALARM,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonPlus: {
    backgroundColor: Colors.ROSE,
    borderRadius: 50,
    marginTop: -26,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  listAlarms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonEdit: {
    width: 30,
    paddingVertical: 3,
  },
  buttonDelete: {
    width: 30,
    paddingVertical: 3,
  },
  viewIcons: {
    flexDirection: 'row',
  },
  hourAlarm: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  daySelect: {
    fontSize: 16,
    marginRight: 7,
    marginBottom: -5,
  },
  // animated clock
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
    backgroundColor: '#F2F1F2',
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
    backgroundColor: '#DFDEDF',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(227,71,134,1)',
    // position: 'relative',
    // marginTop: 15
  },
  alarmDefineButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textDefine: {
    color: '#ffff',
    fontSize: 16,
    marginRight: 5,
  },
});
