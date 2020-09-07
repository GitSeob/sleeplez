import React, { Component } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { AsyncStorage, ScrollView, View, Dimensions, Text, TouchableOpacity, StyleSheet} from 'react-native';

import moment from 'moment';

import monthJson from '../../../jsonFile/monthJson.json'
import {Icon} from 'native-base'

const { width, height } = Dimensions.get("window");

let chartMonth = [1,2,3,4,5]
let chartData = [1,2,3,4,5]
let len = 0
let jmonth = '2018-01'

let avgSlp = ''
let avgDpSlp = 0
let avgStartSlp = ''
let avgWakeSlp = ''

class WeekChart extends Component {
  constructor(props){
    super(props)

    this.state = {
      index: 0
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('userDataMonth')
    .then((val)=>{
      test=val
      tmp = JSON.parse(test)     
      len = Object.keys(tmp).length - 1
      console.log(tmp[len].month)
      jmonth = tmp[len].month
    
      chartMonth = tmp[len].date
      chartData = tmp[len].rate
      avgSlp = tmp[len].avgSlp
      avgDpSlp = tmp[len].avgDpSlp
      avgStartSlp = tmp[len].avgStartSlp
      avgWakeSlp = tmp[len].avgWakeSlp
    })
    .then(()=>{
      console.log(chartData)

      this.setState({
        index: len
      })
    })
    .catch(()=>{console.log('shit')})
    
  }

  shouldComponentUpdate(nextProps, nextState){
    
    if(this.state.index !== nextState.index){
      jmonth = tmp[nextState.index].month
      chartMonth = tmp[nextState.index].date
      chartData = tmp[nextState.index].rate

      avgSlp = tmp[nextState.index].avgSlp
      avgDpSlp = tmp[nextState.index].avgDpSlp
      avgStartSlp = tmp[nextState.index].avgStartSlp
      avgWakeSlp = tmp[nextState.index].avgWakeSlp
      console.log('state : ' + this.state.index)
      console.log('nextState : ' + nextState.index)
    }

    return true
  }

  state = {
    week : moment().subtract(1,'days').format('YYYY-MM')
  }

    render() {
      const { week, index } = this.state;
      const { month } = this.props;
        return (

          <View style={styles.container}>
            <View style={styles.getPeriod}>
            <TouchableOpacity onPress={() => this.decMonth()}>
              <View style={styles.directionBt}>
                <Icon name="arrow-dropleft" style={{color:'white', fontSize: 30}}/>
              </View>
            </TouchableOpacity>
              <Text style={styles.period}>{jmonth}</Text>
            <TouchableOpacity onPress={() => this.incMonth()}>
              <View style={styles.directionBt}>
                <Icon name="arrow-dropright" style={{color:'white', fontSize: 30}}/>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.forChart}>
            <Text style={styles.test}>월간 일별 숙면 통계</Text>
            <LineChart
              data={{
                labels: chartMonth,
                datasets: [{
                  data: chartData
                }]
              }}
              width={width-20} // from react-native
              height={height*0.25}
              chartConfig={{
                backgroundColor: 'black',
                // backgroundGradientFrom: '#',
                // backgroundGradientTo: '#ffa726',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 15
                }
              }}
              bezier
              style={{
                marginTop: 10,
                borderRadius: 16
              }}
            />
          <Text style={styles.test}>평균 수치</Text>
              <View style={styles.statusContainer}>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>평균 수면 시간</Text>
                  <Text style={styles.dataAvg}>{avgSlp}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>평균 숙면 비율</Text>
                  <Text style={styles.dataAvg}>{avgDpSlp}%</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>평균 수면 시작 시간</Text>
                  <Text style={styles.dataAvg}>{avgStartSlp}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>평균 기상 시간</Text>
                  <Text style={styles.dataAvg}>{avgWakeSlp}</Text>
                </View>
              </View>
            </View>
          </View>
          

        )
    }


    decMonth = () => {
      if(this.state.index == 0){
        console.log('overflow')
      }
      else{
        this.setState({
          index: this.state.index - 1
        })
      }
    }

    incMonth = () => {
      if(this.state.index == len){
        console.log('underflow')
      }
      else{
        this.setState({
          index: this.state.index + 1
        })
      }
    }
}

export default WeekChart

const styles = StyleSheet.create({
  container:{
    width: width - 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  forChart: {
    flexDirection: 'column',
    width: width - 10,
    backgroundColor: 'black',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth : 0,
    borderRadius: 0,
    height: height*0.65,
  },
  test: {
    marginTop: 10,
    color: 'white'
  },
  getPeriod: {
    height: 80,
    alignItems:'center',
    flexDirection: 'row'
  },
  directionBt: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  period: {
    fontSize: 20,
    width: width*0.8,
    fontWeight: "500",
    color: 'white',
    textAlign: 'center'
  },
  statusContainer:{
    marginTop: 20,
    alignItems: 'center',
    width: width*0.9,
    height: height*0.1,
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
  }
})
