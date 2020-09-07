import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    AsyncStorage
    } from 'react-native';

import Sol from './Sol/Sol';
import { Icon } from 'native-base';
import moment from 'moment';

import dayJson from '../../jsonFile/dayJson.json'

const { width, height } = Dimensions.get("window")

export default class SolutionTab extends Component{

  state = {
    overTen: false,
    onClick: true,
    onSuccess: false
  }

  componentWillMount() {
    data = dayJson.data
    // obj = JSON.parse(data)
    len = Object.keys(data).length
    console.log(len)
    if(len>9){
      this.setState({
        overTen: true
      })
    }
  }


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='paper' style={{color:tintColor}} />
        )
    }

    render(){
        const { onClick, onSuccess, overTen } = this.state;
        // this.SuccessGetDate();
        return (
            <View style={styles.container}>
                <View>
                  {onClick?(
                    <View>
                    {overTen?(
                      <TouchableOpacity onPress={this.SuccessGetDate}>
                        <View style={{alignItems:'center', backgroundColor:'orange', width: 200, height: 60, borderRadius: 6, alignItems: 'center'}}>
                          <Text style={{color: 'white', fontSize: 20, fontWeight: "300", marginTop: 15}}>솔루션 실행</Text>
                        </View>
                      </TouchableOpacity>):(
                        <View style={{alignItems:'center', backgroundColor:'#bebebe', width: 200, height: 60, borderRadius: 6, alignItems: 'center'}}>
                          <Text style={{color: 'white', fontSize: 12, fontWeight: "100", marginTop: 20}}>
                            10회 이상의 데이터만 요청 가능합니다.
                          </Text>
                        </View>
                      )}
                      </View>
                      ):(
                      <Sol/>
                    )}
                </View>
            </View>
        );
    }

    SuccessGetDate = () => {
      this.setState({
        onClick: false
      })
      setTimeout(()=>{
        this.setState({
          onSuccess:true
      })
    }, 100)
  }


    // Combine = () => {
    //   this.SuccessGetDate();
    //   this._changeComp();
    // }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
      // marginTop: 50,
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      width: 300,
      textAlign:'center',
      color: '#bbb',
    },
    solutionContainer: {
      height: height*0.8,
      width : 50,
      alignItems: 'center',
    }
})
