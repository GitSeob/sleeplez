import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, AsyncStorage } from "react-native";
import RecordScreen from "../RecordScreen";
import Button from "../Button";
import moment from "moment";
import ReactNativeAN from 'react-native-alarm-notification';

const fireDate = '01-01-1976 00:00:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss
 
const alarmNotifData = {
    id: "12345",                                  // Required
    title: "My Notification Title",               // Required
    message: "My Notification Message",           // Required
    channel: "12345",                     // Required. Same id as specified in MainApplication's onCreate method
    auto_cancel: true,                            // default: true
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

class App extends Component {
  pressPlayButton = () => {
    this.setState({
      isPlayed: true,
      isPlaying: true,
      startTime: moment().format('hh:mm'),
      endTime: '00:00',
    });
  }
  pressStopButton = () =>{
    this.setState({
      isPlaying: false,
      endTime: moment().format('hh:mm'),
    })
    ReactNativeAN.stopAlarm();
  }
  state = {
    startTime: '',
    endTime: '',
    isPlaying: false,
    isPlayed: false,
    sensitivity: 10.05,
    userEatTime: '10시에 먹음',//forProps
    userExerciseTime: '열심히 했음',//forProps
    userCoffee: '10잔 마심',//forProps
    alarmTime: 20,
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.recordScreenContainer}>
          <RecordScreen
            isPlaying={this.state.isPlaying}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            sensitivity={this.state.sensitivity}
            userEatTime={this.state.userEatTime}
            userExerciseTime={this.state.userExerciseTime}
            userCoffee={this.state.userCoffee}
            alarmTime={this.state.alarmTime}
          />
        </View>
        <View style={styles.buttonContainer}>
          {!this.state.isPlaying && !this.state.isPlayed &&(
            <Button iconName={"play-circle"} onPress={() => { this.pressPlayButton(); }} />
          )}
          {this.state.isPlaying && (
            <Button iconName={"stop-circle"} onPress={() => { this.pressStopButton(); }} />
          )}
          {!this.state.isPlaying && this.state.isPlayed &&(
            <Text style={{color:'white',fontSize: 80}}>기록 완료!</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
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
});
export default App;