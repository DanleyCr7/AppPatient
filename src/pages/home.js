import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

import {Colors} from '../config/colors';

import Loader from '../components/loader';
const ageDifMs = Date.now();
const date_take = Moment(ageDifMs).add(0, 'days').format();

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMonth: 0,
      visible: false,
      card: {
        expanded: false,
        date_end: Moment(date_take).add(26, 'days').format(),
        date_init: date_take,
        status_treatment: 'Em andamento',
        treatment_: [
          //fila 1
          {
            id: '1',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 107,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '2',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 107,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '3',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 107,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '4',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 107,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 2
          {
            id: '5',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 145,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '6',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 145,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '7',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 145,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '8',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 145,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 3
          {
            id: '9',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 182,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '10',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 182,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '11',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 182,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '12',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 182,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 4
          {
            id: '13',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 220,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '14',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 220,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '15',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 220,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '16',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 220,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 5
          {
            id: '17',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 264,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '18',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 264,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '19',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 264,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '20',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 264,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 6
          {
            id: '21',
            compressed: 'branco',
            x1Mobile: 100,
            y1Mobile: 302,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '22',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 302,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '23',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 302,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '24',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 302,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          //fila 7
          {
            id: '25',
            compressed: 'branco',
            x1Mobile: 145,
            y1Mobile: 340,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '26',
            compressed: 'branco',
            x1Mobile: 192,
            y1Mobile: 340,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
          {
            id: '27',
            compressed: 'branco',
            x1Mobile: 238,
            y1Mobile: 340,
            radius: 22,
            date_take: Moment(date_take).format(),
          },
        ],
      },
    };
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     visible: !this.state.visible,
    //   });
    // }, 5000);
  }
  // buildStyle(item, index) {
  //   const {compressed} = item;
  //   const style = {
  //     width: 0,
  //     height: 0,
  //   };
  //   if (compressed === 'verde') {
  //     style.width = 22;
  //     style.height = 22;
  //     style.borderRadius = 22 / 2;
  //     style.backgroundColor = '#85bd7a';
  //     style.marginHorizontal = 8;
  //     style.marginBottom = 10;
  //   }
  //   if (compressed === 'branco') {
  //     style.width = 22;
  //     style.height = 22;
  //     style.borderRadius = 22 / 2;
  //     style.backgroundColor = '#ffff';
  //     style.marginHorizontal = 8;
  //     style.marginBottom = 10;
  //   }
  //   return style;
  // }
  async takeCompress(item) {
    // console.log(date_take)
    let items = this.state.card;
    const index = items.treatment_.indexOf(item);
    items.treatment_[index].compressed =
      item.compressed === 'branco' ? 'verde' : 'branco';
    console.log(items);
    await this.setState({card: items});
  }

  handleMonthSelect = (index) => {
    this.setState({selectMonth: index});
  };

  render() {
    const {visible, card} = this.state;
    if (visible) {
      return <Loader visible={true} />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.contPerfil}>
            <View style={styles.contPerfilDesc}>
              <Image
                source={{
                  uri:
                    'data:image/jpeg;base64,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',
                }}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 35,
                  borderRadius: 25,
                }}
              />
              <View style={{marginLeft: 5}}>
                <Text style={styles.textName}>Bernada Santos</Text>
                <Text style={styles.textProf}>Paucibacilar Adulto</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Icon name="bell" color={Colors.BUTTON} size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 55,
              paddingLeft: 10,
              marginTop: -20,
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                {month: 'Jan', key: '1'},
                {month: 'Fev', key: '2'},
                {month: 'Mar', key: '3'},
              ]}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  // style={styles.months}
                  key={item.key}
                  onPress={() => this.handleMonthSelect(index)}>
                  <View
                    style={
                      this.state.selectMonth === index
                        ? styles.selectMonth
                        : styles.month
                    }>
                    <Text
                      style={
                        this.state.selectMonth === index
                          ? styles.textMonth
                          : styles.textSelectMonth
                      }>
                      {item.month}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <ImageBackground
            source={require('../images/cartelas/paucibalarAdulto.png')}
            style={{
              width: 250,
              height: 418,
              marginTop: 5,
              paddingTop: 112,
              alignItems: 'center',
            }}
            resizeMode={'contain'}>
            <FlatList
              data={card.treatment_}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  keyExtractor={(item) => item.id}
                  onPress={() => this.takeCompress(item)}
                  // style={this.buildStyle(obj, index)}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 22,
                    backgroundColor:
                      card.treatment_[index].compressed === 'branco'
                        ? '#fff'
                        : '#85bd7a',
                    marginHorizontal: 13,
                    marginBottom: 17,
                  }}></TouchableOpacity>
              )}
              numColumns={4}
            />
            {/* {card.treatment_
              ? card.treatment_.map((objt, index) => (
                  <TouchableOpacity
                    key={objt.id}
                    onPress={() => this.takeCompress(objt)}
                    style={this.buildStyle(objt)}></TouchableOpacity>
                ))
              : null} */}
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CONTAINER,
    alignItems: 'center',
    flex: 1,
  },
  contPerfil: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  contPerfilDesc: {
    flexDirection: 'row',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TEXT,
  },
  textProf: {
    fontSize: 15,
    color: Colors.TEXT,
  },
  selectMonth: {
    backgroundColor: Colors.SELECT,
    width: 130,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  month: {
    backgroundColor: Colors.NOTSELECT,
    width: 130,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textMonth: {
    fontSize: 18,
    color: '#fff',
  },
  textSelectMonth: {
    fontSize: 18,
    color: Colors.TEXT,
  },
});
