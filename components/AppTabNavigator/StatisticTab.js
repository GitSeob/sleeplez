import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage
    } from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';

import DayChart from './componentsForChart/DayChart';
import WeekChart from './componentsForChart/WeekChart';

const{width, height} = Dimensions.get("window");

class StatisticTab extends Component{
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name='pie' style={{color:tintColor}} />
    )
}

  constructor(props){
    super(props)

    this.state = {
      dataflg: false,
      onDay: true,
      selectPeriod: false,
      date: moment().subtract(1,'days').format('YYYY-MM-DD'),
      week: moment().format('YYYY-MM-Do')
    }
  }

    render(){
      const { onDay, selectPeriod, date, week, dataflg } = this.state;
        return (
            <View style={styles.container}> 
              <View style={styles.titleContainer}>
                  <TouchableOpacity onPress={this._changePeriod}>
                    {onDay?(
                      <View style={styles.chartPeriod}>
                        <Text style={{textAlign:'center',fontWeight:"600", color:'white', marginTop:2}}>일 별 통계</Text>
                        <Text style={{color:'white', color:'#CCCCCC',fontSize:8,textAlign:'center'}}>월 별 통계를 보시려면 이곳을 누르세요</Text>
                      </View>
                    ):(<View style={styles.chartPeriod}>
                      <Text style={{textAlign:'center',fontWeight:"600", color:'white'}}>월 별 통계</Text>
                      <Text style={{color:'white', color:'#CCCCCC',fontSize:8,textAlign:'center'}}>일 별 통계를 보시려면 이곳을 누르세요</Text>
                    </View>)}
                  </TouchableOpacity>
              </View>
                {onDay?(
                  <DayChart />
                ):(<WeekChart />)}
            </View>
        );
    }

    _changePeriod = () =>{
      this.setState(prevState => {
        return{
          onDay: !prevState.onDay
        }
      })
    }

}

export default StatisticTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    titleContainer: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      color: '#bbb',
    },
    period: {
      fontSize: 20,
      width: width*0.8,
      fontWeight: "300",
      color: '#bbb',
      textAlign: 'center'
    },
    chartPeriod: {
      fontWeight: "600",
      color: 'black',
      height: height*0.05,
      backgroundColor: 'black',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#333333",
      marginTop: 20,
      width: width*0.8
    },
    forChart: {
      backgroundColor: 'black',
      width: width - 20,
      alignItems: 'center',
      borderColor: 'white',
      borderWidth : 1,
      borderRadius: 5,
      height: height*0.65,
      marginVertical: 20,
      alignItems: 'center',
      textAlign: 'center'
    },
    test: {
      color: 'white'
    },
    getPeriod: {
      height: 80,
      alignItems:'center',
      flexDirection: 'row'
    },
    directionBt: {
      marginVertical: 15,
    }

})
