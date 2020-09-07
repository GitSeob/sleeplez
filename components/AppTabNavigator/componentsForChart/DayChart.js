import React, { Component } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
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


import dayJson from '../../../jsonFile/dayJson.json'
import { connect } from 'react-redux';
import { Icon } from 'native-base' 

let chartData = [1,2,3,4,5]
let chartTime = [1,2,3,4,5]

let dpRate = 1
let shRate = 2
let wkRate = 3
let len = 0
// let date = '2222-12-31'
let value = {}
let indx = 0
let date = '2018-01-01'
let dataflg = false

const { width, height } = Dimensions.get("window");

class DayChart extends Component {
  constructor(props){
    super(props)

    this.state = {
          isLoading: false,
          error: '',
          indx: 0,
          userid: '',
          date: [],
          chartTime: [],
          chartData: [],
          sp: [],
          wt: [],
          value: {}
        }    
  }
  

  componentWillMount() { 
    
    AsyncStorage.getItem('userData')
    .then((val)=>{
      test=val
      tmp = JSON.parse(test)     
      len = Object.keys(tmp).length - 1
      console.log(tmp[len].date)
      date = tmp[len].date
    
      chartTime = tmp[len].chartTime
      chartData = tmp[len].chartData

      dpRate = tmp[len].dpRate
      shRate = tmp[len].shRate
      wkRate = tmp[len].wkRate
    })
    .then(()=>{
      console.log(chartData)

      this.setState({
        indx: len
      })
    })
    .catch(()=>{
      console.log('shit')
    })
  }


  shouldComponentUpdate(nextProps, nextState) {

    if(this.state.indx !== nextState.indx){
      console.log(this.state.indx)
      console.log(nextState.indx)
      date = tmp[nextState.indx].date
    
      chartTime = tmp[nextState.indx].chartTime
      chartData = tmp[nextState.indx].chartData

      dpRate = tmp[nextState.indx].dpRate
      shRate = tmp[nextState.indx].shRate
      wkRate = tmp[nextState.indx].wkRate
      console.log('chart data change')
    }
    return true;
  }


    render() {

      const data = [
        { name: 'Deep', population: dpRate, color: '#777777', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Shallow', population: shRate, color: '#aaaaaa', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'WeekUp', population: wkRate, color: '#dedede', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ]
      const { datac, indx } = this.state;

        return(
          <ScrollView>
          <View style={styles.container}>
            <View style={styles.getPeriod}>
            <TouchableOpacity onPress={()=>this._dayDecrease()}>
              <View style={styles.directionBt}>
                <Icon name="arrow-dropleft" style={{color:'white', fontSize: 30}}/>
              </View>
            </TouchableOpacity>
              <Text style={styles.period}>{date}</Text>
            <TouchableOpacity onPress={()=>this._dayIncrease()}>
              <View style={styles.directionBt}>
                <Icon name="arrow-dropright" style={{color:'white', fontSize: 30}}/>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.forChart}>
              <Text style={styles.test}>숙면 비율</Text>
              <PieChart
                data={data}
                width={width-20}
                height={height*0.25}
                chartConfig={{
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            <Text style={styles.test}>시간별 숙면도</Text>
              <LineChart
                data={{
                  labels: chartTime,
                  datasets: [{
                    data: chartData
                  }]
                }}
                width={width-20} // from react-native
                height={height*0.25}
                chartConfig={{
                  backgroundColor: '#000000',
                  // backgroundGradientFrom: '#fb8c00',
                  // backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
          </View>
          </ScrollView>
        );
    }

    _dayDecrease = () => {
      if(this.state.indx == 0){
        console.log('end date')
      }
      else{
        this.setState({
          indx: this.state.indx - 1
        })
      }
    }

    _dayIncrease = () => {
      if(this.state.indx == len){
        console.log('end date')
      }
      else{
        this.setState({
          indx: this.state.indx + 1
        })
      }
    }
}

mapStateToProps = (state) => {
  return {
    userid: state.login.userid
  }
}

export default connect(mapStateToProps)(DayChart)

const styles = StyleSheet.create({
  container:{
    width: width - 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  forChart: {
    width: width - 10,
    flexDirection:'column',
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
    marginVertical: 15,
    marginHorizontal: 10,
  },
  period: {
    fontSize: 20,
    width: width*0.8,
    fontWeight: "500",
    color: 'white',
    textAlign: 'center'
  },
})
