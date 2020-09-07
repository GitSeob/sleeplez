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

const{width, height} = Dimensions.get("window");

export default class Sound extends Component{
  state = {
    isCompleted: false,
    gyzo: true,
    soundCheck: false
  };

  render(){
    const { isCompleted, gyzo, soundCheck } = this.state;

    return(
      <View style={styles.container}>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          onPress={this._toggleComplete}>
            <Text style={styles.text}>수면 체크 방법</Text>
        </TouchableOpacity>
      </View>
      {isCompleted?(
        <View style={styles.actions}>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkGyzo}>
                      <Text style={styles.listText}>가속도계</Text>
                      {gyzo?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkSound}>
                        <Text style={styles.listText}>마이크</Text>
                        {soundCheck?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
        </View>)
        :(<View style={styles.actions}></View>)}
        </View>
    )
  }
  _toggleComplete = () =>{
    this.setState(prevState => {
      return{
        isCompleted: !prevState.isCompleted
      }
    })
  }

  _checkGyzo = () => {
    this.setState({
      gyzo: true,
      soundCheck: false
    })
  }
  _checkSound = () => {
    this.setState({
      gyzo: false,
      soundCheck: true
    })
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
    color: 'white',
    fontWeight: "200",
    fontSize: 18,
    marginVertical: 20,
  },
  testContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  }
})
