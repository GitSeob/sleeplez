import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, AppRegistry, Alert, Navigator, AsyncStorage, Platform, AppState, StatusBar,
} from 'react-native';
import { WheelPicker, DatePicker, TimePicker } from 'react-native-wheel-picker-android';
import { Button } from 'react-native-elements';
import {StackNavigator, createStackNavigator} from 'react-navigation';
import { Icon } from 'native-base';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import { Accelerometer } from "react-native-sensors";
import sleeping from './sleeping'
//import RecordScreen from "../RecordScreen";
//import Button from "../Button";
//import moment from "moment";

class AlarmTab extends Component {

    constructor(props){
      super(props);
      this.state = {
        time: '',
        time2: '',
        time3: ''
      }
      this._decreaseTime = this._decreaseTime.bind(this);
    };

    render() {
      const now = new Date();
      const kkk = new Date();

      return (
        <View style={styles.container}>
           <TimePicker
             initDate={now.toISOString()}
             onTimeSelected={(date)=>this._decreaseTime(date)}/>
             <Text style={{marginTop: 30, fontSize: 17, color: '#fff'}}> 다음 시간 사이에 기상 </Text>
             <Text style={{marginBottom: 100, fontSize: 17, color: '#fff'}}>
             {this.state.time2.substr(0, 5) + this.state.time2.substr(8, 5)} -
              {this.state.time.substr(0, 5) + this.state.time.substr(8, 5)} </Text>

            <Button style={{marginBottom: 20, paddingBottom: 20}}
              containerStyle={{
                marginbottom: 500,
              }}
              textStyle={{
                textAlign:'center',
                fontSize: 20,
              }}
              title = "사용자 정보 입력"
              onPress = {() => this.props.navigation.navigate('Usrinput')}
              buttonStyle={{
                backgroundColor: "#fe755b",
                width: 170,
                height: 60,
                borderWidth: 0,
                borderRadius: 10,
                marginBottom: 80
              }}
              />
        <PushController />
        </View>
      );
    }

    _decreaseTime = (date) =>{
      let date2 = new Date(date);
      date2.setMinutes(date.getMinutes() - 30)
      this.setState({
        time: date.toLocaleTimeString(),
        time2: date2.toLocaleTimeString(),
      })
    }
}

class Usrinput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canada: ''
    };
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _coffee(province) {

  this.setState({
      ...this.state,
      coffee: province
    });
  }

  _lasteat(province) {

  this.setState({
      ...this.state,
      lasteat: province
    });
  }

  _health(province) {

  this.setState({
      ...this.state,
      health: province
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'black'}}>
          <Select style={{marginTop:100, marginLeft:160, marginBottom:-32, alignItems: 'center'}}
            width={150}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="섭취량 선택"
            onSelect={this._coffee.bind(this)}>
            <Option>1잔</Option>
            <Option>2잔</Option>
            <Option>3잔</Option>
            <Option>4잔</Option>
            <Option>5잔 이상</Option>
          </Select>
          <Text style={{color: 'white', fontSize:24, marginRight:180}}>카페인 섭취량</Text>




          <Select style={{marginTop:30, marginLeft:160, alignItems: 'center', marginBottom:-32}}
            width={150}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="식사 시간 선택"
            onSelect={this._lasteat.bind(this)}>
            <Option>00:00</Option>
            <Option>00:30</Option>
            <Option>01:00</Option>
            <Option>01:30</Option>
            <Option>02:00</Option>
            <Option>02:30</Option>
            <Option>03:00</Option>
            <Option>03:30</Option>
            <Option>04:00</Option>
            <Option>04:30</Option>
            <Option>05:00</Option>
            <Option>05:30</Option>
            <Option>06:30</Option>
            <Option>07:00</Option>
            <Option>07:30</Option>
            <Option>08:00</Option>
            <Option>08:30</Option>
            <Option>09:00</Option>
            <Option>09:30</Option>
            <Option>10:00</Option>
            <Option>10:30</Option>
            <Option>11:00</Option>
            <Option>11:30</Option>
            <Option>12:00</Option>
            <Option>12:30</Option>
            <Option>13:00</Option>
            <Option>13:30</Option>
            <Option>14:00</Option>
            <Option>14:30</Option>
            <Option>15:00</Option>
            <Option>15:30</Option>
            <Option>16:00</Option>
            <Option>16:30</Option>
            <Option>17:00</Option>
            <Option>17:30</Option>
            <Option>18:00</Option>
            <Option>18:30</Option>
            <Option>19:00</Option>
            <Option>19:30</Option>
            <Option>20:00</Option>
            <Option>20:30</Option>
            <Option>21:00</Option>
            <Option>21:30</Option>
            <Option>22:00</Option>
            <Option>22:30</Option>
            <Option>23:00</Option>
            <Option>23:30</Option>
            <Option>24:00</Option>
          </Select>

          <Text style={{color: 'white', fontSize:24, marginRight:165}}>마지막 식사 시간</Text>



          <Select style={{marginTop:30, marginLeft:160, alignItems: 'center',marginBottom:-32}}
            width={150}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="운동량 선택"
            onSelect={this._health.bind(this)}>
            <Option>전혀 안함</Option>
            <Option>약간 함</Option>
            <Option>조금 많이 함</Option>
            <Option>죽을 만큼 힘듦</Option>
            <Option>이미 죽음</Option>
          </Select>

          <Text style={{color: 'white', fontSize:24, marginRight:165}}>오늘 하루 운동량</Text>

          <OptionList ref="OPTIONLIST"/>

          <Text style={{marginBottom: 50, marginTop:90, color:'#ffffff'}}>분석을 위해서 사용자의 생활 데이터가 필요합니다.(권장)</Text>

          <Button style={{marginBottom: 20}}
            containerStyle={{
              marginbottom: 50,
            }}
            textStyle={{
              textAlign:'center',
              fontSize: 25,
            }}
            title = "시작"
            onPress = {() => this.props.navigation.navigate('sleeping')}
            buttonStyle={{
              backgroundColor: "#fe755b",
              width: 170,
              height: 60,
              borderWidth: 0,
              borderRadius: 10,
            }}
            />

      </View>
    );
  }
}

AppRegistry.registerComponent('navigation', () => Usrinput, sleeping);

export default class App extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        < Icon name='ios-alarm' style={{color:tintColor}} />
    )
}

  render() {
    return (
        <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Home:{
    screen: AlarmTab,
    navigationOptions: {
      header: null,
    }
  },
  Usrinput: {
    screen: Usrinput,
    navigationOptions: {
      header: null,
    }
  },
  sleeping:{
    screen: sleeping,
    navigationOptions: {
      header: null,
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  submit: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#f57f8f',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  timerContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
},
ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
},
valueValue: {
    width: 20,
    fontSize: 20
  },
valueName: {
    width: 70,
    fontSize: 20,
    fontWeight: "bold"
},
valueContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  wheelPicker: {
  width: "100%",
  height: 50,
  backgroundColor: 'black',
  justifyContent: 'center',
  marginTop:20,
  flex: 1,
  alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#555555",
  },
  formButton: {
    borderWidth: 1,
    borderColor: "#555555",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
  recordScreenContainer: {
    flex: 4,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
