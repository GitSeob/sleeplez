import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    AsyncStorage
    } from 'react-native';

import SolMiddle from './SolMiddle'

const { width, height } = Dimensions.get("window")

const bscore = []
let jsonDataForServer = {}
const bSleepTime = []
const bCoffee = []
const bExerTime = []
const bLastEat = [] 
let url = ''
let tmp = ''

export default class Sol extends Component{
  constructor(props){
    super(props)

    this.state = {
      onSuccess: false,
      update_date: "0000-00-00",
      sleepTime: "00:00",
      coffee: 99,
      exerTime: "00:00",
      lastEat: "00:00",
      loading_flg: false
    }
  }

  _getData = () => {
    AsyncStorage.getItem('userData')
    .then((val)=>{
      jsonDataForServer = JSON.parse(val)
      return jsonDataForServer
      // console.log(jsonDataForServer)
    })
  }

  _getUrl = async() => {
    userid = await AsyncStorage.getItem('user')
    tmp = await AsyncStorage.getItem('userData')
    jsonDataForServer = JSON.parse(tmp)

    url = 'http://13.209.211.60:3030/solution/' + userid
    console.log(url)
    len = Object.keys(jsonDataForServer).length -1 
    for(let i =0; i< len; i++){
      bscore.push(jsonDataForServer[i].score)
      bSleepTime.push(jsonDataForServer[i].sleepTime)
      bCoffee.push(jsonDataForServer[i].coffee)
      bExerTime.push(jsonDataForServer[i].exerTime)
      bLastEat.push(jsonDataForServer[i].lastEat)
    }

    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        solData:{
          score: bscore,
          sleepTime: bSleepTime,
          coffee: bCoffee,
          exerTime: bExerTime,
          lastEat: bLastEat
        },
        backupData: jsonDataForServer
      })
    })
    .then(response => response.json())
    .then(res=> {
      this.setState({
        update_date: res.update_date,
        sleepTime: res.sleepTime,
        coffee: res.coffee,
        exerTime: res.exerTime,
        lastEat: res.lastEat
      })
      setTimeout(()=>this.setState({
        loading_flg: true
      }), 3000)
    })
    .catch((error)=>console.error(error))
    
  }

  componentWillMount(){

    this._getUrl()

  }

    render(){
      const { onSuccess, sleepTime, coffee, exerTime, lastEat, update_date } = this.state;
        return (
            <View style={styles.container}>
            {this.state.loading_flg?(
              <SolMiddle
                update = {this.state.update_date}
                sleepTime = {this.state.sleepTime}
                coffee = {this.state.coffee}
                exerTime = {this.state.exerTime}
                lastEat = {this.state.lastEat}
              />):(
                <ActivityIndicator/>
              )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {

    },
    solContainer: {
      alignItems: 'center'
    },
    solContext: {

    },
    statusContainer:{
      marginTop: 20,
      alignItems: 'center',
      width: width*0.9,
      flexDirection: 'row',
      // borderColor:'white',
      borderWidth: 1,
    },
    content: {
      width: width*0.45,
      height: 100,
      flexDirection: 'column',
      // borderColor:'white',
      borderWidth: 1,
      // borderBottomWidth: StyleSheet.hairlineWidth-40,
      // borderTopWidth: StyleSheet.hairlineWidth-10,
      // borderBottomColor: 'white',
      // borderTopColor: 'white',
    },
    dataTitle: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: "400",
      color: 'white'
    },
    dataAvg: {
      marginTop: 20,
      color: 'white',
      fontSize: 30,
      fontWeight: "600",
      textAlign: 'center',
    },
    test: {
      textAlign:'center',
      width: 200,
      marginTop: 10,
      color: 'white'
    },
})