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
    isSound1 : true,
    isSound2 : false,
    isSound3 : false,
    isSound4 : false,
  };


  render(){
    const { isCompleted, isSound1, isSound2, isSound3, isSound4 } = this.state;
    return(
      <View style={styles.container}>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          onPress = {this._toggleComplete}>
            <Text style={styles.text}>음악</Text>
        </TouchableOpacity>
      </View>
        {isCompleted?(
          <View style={styles.actions}>
            <View style={styles.listContainer}>
              <TouchableOpacity style={styles.testContainer} onPress={this._checkSound1}>
                <Text style={styles.listText}>유창현 OST</Text>
                {isSound1?(<Text>✅</Text>):(<Text></Text>)}
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <TouchableOpacity style={styles.testContainer}  onPress={this._checkSound2}>
                <Text style={styles.listText}>정원경의 ASMR</Text>
                {isSound2?(<Text>✅</Text>):(<Text></Text>)}
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <TouchableOpacity style={styles.testContainer}  onPress={this._checkSound3}>
                <Text style={styles.listText}>김광현의 지구종말곡</Text>
                {isSound3?(<Text>✅</Text>):(<Text></Text>)}
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <TouchableOpacity style={styles.testContainer} onPress={this._checkSound4}>
                <Text style={styles.listText}>안홍섭의 고콜이</Text>
                {isSound4?(<Text>✅</Text>):(<Text></Text>)}
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
}// 버튼을 누르면 이전 상태의 반대(ex>참이면 거짓)를 state에 주는거임
  _checkSound1 = () => {
    this.setState({
    isSound1: true,
    isSound2: false,
    isSound3: false,
    isSound4: false})
  }
  _checkSound2 = () => {
    this.setState({
    isSound1: false,
    isSound2: true,
    isSound3: false,
    isSound4: false})
  }
  _checkSound3 = () => {
    this.setState({
    isSound1: false,
    isSound2: false,
    isSound3: true,
    isSound4: false})
  }
  _checkSound4 = () => {
    this.setState({
    isSound1: false,
    isSound2: false,
    isSound3: false,
    isSound4: true})
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
    alignItems: 'center',
    flexDirection: 'row'
  }
})
