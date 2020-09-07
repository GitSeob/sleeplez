import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
    } from 'react-native';

import { Icon } from 'native-base';
import ToggleSwitch from './ToggleSwitch'

const{width, height} = Dimensions.get("window");

export default class Volume extends Component{
  constructor() {
      super();
      this.state = {
         switch1Value: false,
      }
   }
   toggleSwitch1 = (value) => {
      this.setState({switch1Value: value})
      console.log('Switch 1 is: ' + value)
   }

  render(){
    return(
      <View style={styles.settingContainer}>
        <Text style={styles.text}>알람설정</Text>
        <ToggleSwitch
          toggleSwitch1 = {this.toggleSwitch1}
          switch1Value = {this.state.switch1Value}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  settingContainer: {
    width: width - 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  text: {
    width: width*0.75,
    color: 'white',
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  listContainer: {
    width: width - 40,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  actions: {
    flexDirection: 'column'
  },
  listText:{
    color: 'red',
    fontWeight: "200",
    fontSize: 15,
    marginVertical: 20,
  }
})
