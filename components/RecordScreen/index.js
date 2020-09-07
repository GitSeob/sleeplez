import React, { Component } from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, AsyncStorage, ScrollView } from "react-native";
import Record from "../../data/Record";
import { Accelerometer } from "react-native-sensors";
import { YAxis, LineChart, XAxis, } from "react-native-svg-charts";
import * as shape from "d3-shape";
import ReactNativeAN from 'react-native-alarm-notification';

const fireDate = '01-01-1976 00:00:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss

const alarmNotifData = {
  id: "12345",                                  // Required
  title: "My Notification Title",               // Required
  message: "My Notification Message",           // Required
  channel: "12345",                     // Required. Same id as specified in MainApplication's onCreate method
  auto_cancel: false,                            // default: true
  vibrate: false,
  vibration: 0,                               // default: 100, no vibration if vibrate: false
  small_icon: "ic_launcher",                    // Required
  large_icon: "ic_launcher",
  play_sound: true,
  sound_name: 'my_sound.mp3',                             // Plays custom notification ringtone if sound_name: null
  color: "red",
  schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
  tag: 'some_tag',
  fire_date: fireDate,                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

  // You can add any additional data that is important for the notification
  // It will be added to the PendingIntent along with the rest of the bundle.
  // e.g.
  data: { foo: "bar" },
};

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  time -= minutes * 60;

  var seconds = parseInt(time % 60, 10);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10
    ? `0${seconds}`
    : seconds}`;
}
function isShaked(gX, gY, gZ, thresh) {
  var gForce = Math.sqrt((gX * gX) + (gY * gY) + (gZ * gZ));
  return gForce > thresh ? true : false;
}
const accel = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});
class sleepState {
  constructor(time, level) {
    this.time = time;
    this.level = level;
  }
}
const Value = ({ name, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
)
class RecordScreen extends Component {
  getInitialState() {
    return {
      shake: 0,
      curTime: 0,
      lastTime: 0,
      level: 0,
      cnt: 0,
      scnt: 0,
      data: [],
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      shake: 0,
      curTime: 0,
      lastTime: 0,
      level: 0,
      cnt: 0,
      scnt: 0,
      data: [0, -4, 0, -4, 0, -4, 0, -4, 0, -4, 0],
      startTime: '00:00',
      endTime: '00:00',
      isAlarm: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    this.setState({
      startTime: nextProps.startTime,
      endTime: nextProps.endTime,
    });
    const timerInterval = 10;
    if (!currentProps.isPlaying && nextProps.isPlaying){
      // if (currentProps.isPlaying) {
      this.resetKey();
      this.setState(this.getInitialState());
      var data = new Array();
      accel.then(observable => {
        observable.subscribe(({ gX, gY, gZ }) => {
          if (isShaked(gX, gY, gZ, this.props.sensitivity)) {
            this.setState({ shake: 1 });
            this.setState({ cnt: 0 });
            this.setState({ scnt: this.state.scnt + 1 });
            if (this.state.scnt > 1) {
              this.setState({ scnt: 0 });
              if (this.state.level < 0) {
                this.setState({ level: this.state.level + 1 });
              }
            }
          } else {
            this.setState({ shake: 0 });
          }
          if (this.state.curTime - this.state.lastTime >= timerInterval) {
            this.setState({ lastTime: this.state.curTime });
            data.push(this.state.level);
            this.setState({ data: data });
            if (this.state.shake === 0) {
              if (this.state.cnt < 3) {
                this.setState({ scnt: 0 });
                this.setState({ cnt: this.state.cnt + 1 });
              } else {
                this.setState({ cnt: 0 });
                if (this.state.level > -4) {
                  this.setState({ level: this.state.level - 1 });
                }
              }
            }
          }
          if (!this.state.isAlarm && this.state.level === 0 && this.state.curTime > 100) {
            ReactNativeAN.sendNotification(alarmNotifData);
            this.setState({isAlarm:true});
            // setTimeout(()=>{ReactNativeAN.stopAlarm()}, 3000)
            //ReactNativeAN.stopAlarm()
            console.log('time out check')
          }

          // ReactNativeAN.stopAlarm();

          this.setState({ curTime: this.state.curTime + 1 });
        });
      });
    } 
    else if (currentProps.isPlaying && !nextProps.isPlaying) {
      console.log('stop check')
      ReactNativeAN.stopAlarm();  
      accel.then(observable => {
        observable.stop();
      })
    }
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({ myKey: value });
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }
  render() {
    const contentInset = { top: 40, bottom: 40 };
    const sleepStateString = ["렘수면", "1단계", "2단계", "3단계", "4단계"];
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={{ alingItems: 'center', justifyContent: 'center' }}>
            <Text style={{ flex: 1, color: 'grey' }}>{this.state.shake}</Text>
          </View>
          <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, right: 10 }}>수면 그래프</Text>
          </View>
        </View>
        <View style={styles.graph}>
          <YAxis
            style={{ width: 30 }}
            data={this.state.data}
            contentInset={contentInset}
            svg={{
              fill: 'white',
              fontSize: 10,
            }}
            numberOfTicks={5}
            formatLabel={value => `${sleepStateString[Math.floor(-value)]}`}
          />
          <View style={styles.plot}>
            <LineChart
              style={{ flex: 1 }}
              data={this.state.data}
              contentInset={contentInset}
              curve={shape.curveNatural}
              svg={{ stroke: 'lightgreen' }}
            >
            </LineChart>
            <XAxis
              data={this.state.data}
              formatLabel={(value) => formatTime(value)}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 10, fill: 'white', }}
              numberOfTicks={5}
            />
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoTime}>
            <View style={styles.timePresent}>
              <Text style={{ color: 'white', fontSize: 30, fontWeight: '800' }}>시작 시간</Text>
              <Text style={{ color: 'white', fontSize: 70 }}>{this.state.startTime}</Text>
            </View>
            <View style={styles.timePresent}>
              <Text style={{ color: 'white', fontSize: 30, fontWeight: '800' }}>종료 시간</Text>
              <Text style={{ color: 'white', fontSize: 70 }}>{this.state.endTime}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timePresent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoUser: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  infoTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  info: {
    flex: 6,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    flexDirection: 'row',
    flex: 1,
  },
  graph: {
    flexDirection: 'row',
    flex: 4,
    margin: 20,
  },
  plot: {
    flex: 9,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  valueValue: {
    textAlign: 'center',
    width: 200,
    color: 'white',
    fontSize: 30
  },
  valueName: {
    textAlign: 'center',
    width: 200,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
});

export default RecordScreen;