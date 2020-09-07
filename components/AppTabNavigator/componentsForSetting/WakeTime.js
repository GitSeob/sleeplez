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
    isTime1 : false,
    isTime2 : false,
    isTime3 : true,
    isTime4 : false,
    isTime5 : false,
  };

  render(){
    const { isCompleted , isTime1, isTime2, isTime3, isTime4, isTime5} = this.state;

    return(
      <View style={styles.container}>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          onPress={this._toggleComplete}>
            <Text style={styles.text}>기상 단계</Text>
        </TouchableOpacity>
      </View>
      {isCompleted?(
        <View style={styles.actions}>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkTime1}>
                        <Text style={styles.listText}>'10min'</Text>
                        {isTime1?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkTime2}>
                        <Text style={styles.listText}>'20min'</Text>
                        {isTime2?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkTime3}>
                        <Text style={styles.listText}>'30min(권장)'</Text>
                        {isTime3?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkTime4}>
                        <Text style={styles.listText}>'40min'</Text>
                        {isTime4?(<Text>✅</Text>):(<Text></Text>)}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.testContainer} onPress={this._checkTime5}>
                        <Text style={styles.listText}>'50min'</Text>
                        {isTime5?(<Text>✅</Text>):(<Text></Text>)}
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
  _checkTime1 = () => {
    this.setState({
      isTime1: true,
      isTime2: false,
      isTime3: false,
      isTime4: false,
      isTime5: false
    })
  }
  _checkTime2 = () => {
    this.setState({
      isTime1: false,
      isTime2: true,
      isTime3: false,
      isTime4: false,
      isTime5: false
    })
  }
  _checkTime3 = () => {
    this.setState({
      isTime1: false,
      isTime2: false,
      isTime3: true,
      isTime4: false,
      isTime5: false
    })
  }
  _checkTime4 = () => {
    this.setState({
      isTime1: false,
      isTime2: false,
      isTime3: false,
      isTime4: true,
      isTime5: false
    })
  }
  _checkTime5 = () => {
    this.setState({
      isTime1: false,
      isTime2: false,
      isTime3: false,
      isTime4: false,
      isTime5: true
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
