import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
    } from 'react-native';
import Volume from './componentsForSetting/Volume'
import { Icon } from 'native-base';
import * as actions from '../../actions'
import dayJson from '../../jsonFile/dayJson.json'
import monthJson from '../../jsonFile/monthJson.json'
// import store from '../../store'

import { connect } from 'react-redux'

const{width, height} = Dimensions.get("window");

const testData = {
  "date": "2018-10-29",
  "sleepTime": "01:42",
  "wakeTime": "11:07",
  "dpRate": 50,
  "shRate": 0,
  "wkRate": 50,
  "score": 73.5,
  "chartTime":
  [
    "04:30", "05:00",
    "05:30", "06:00",
    "06:30", "07:00",
    "07:30", "08:00",
    "08:30", "09:00",
    "09:30", "10:00"
  ],
  "chartData": [
    100, 80,
    30, 20,
    50, 70,
    10, 0,
    30, 15,
    70, 95
  ],
  "coffee": 1,
  "exerTime": "00:00",
  "lastEat": "18:40"
}

class HomeTab extends Component{

  constructor(props){
    super(props)

    this.state = {
      musicCompleted: false,
      checkCompleted: false,
      wakeCompleted: false,
      value: {}
    }
  }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='md-settings' style={{ color: tintColor}}/>
        )
    }


    render(){
      const { musicCompleted, checkCompleted, wakeCompleted} = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.title}>SETTING</Text>
                <ScrollView contentContainerStyle={styles.settingScroll}>
                  <Volume />

                    <View style={styles.settingContainer}>
                      <TouchableOpacity
                        onPress = {this._toggleMusicComplete}>
                          <Text style={styles.text}>음악</Text>
                      </TouchableOpacity>
                    </View>
                      {musicCompleted?(
                        <View style={styles.actions}>
                          <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selOne()}>
                              <Text style={styles.listText}>SOUND 1</Text>
                              {this.props.isSound1?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                            </TouchableOpacity>
                          </View>
                          <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.testContainer}  onPress={()=>this.props.selTwo()}>
                              <Text style={styles.listText}>SOUND 2</Text>
                              {this.props.isSound2?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                            </TouchableOpacity>
                          </View>
                          <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.testContainer}  onPress={()=>this.props.selThree()}>
                              <Text style={styles.listText}>SOUND 3</Text>
                              {this.props.isSound3?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                            </TouchableOpacity>
                          </View>
                          <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selFour()}>
                              <Text style={styles.listText}>SOUND 4</Text>
                              {this.props.isSound4?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                            </TouchableOpacity>
                          </View>
                        </View>)
                        :(<View style={styles.actions}></View>)}

                        <View style={styles.settingContainer}>
                          <TouchableOpacity
                            onPress={this._CheckComplete}>
                              <Text style={styles.text}>수면 체크 방법</Text>
                          </TouchableOpacity>
                        </View>
                        {checkCompleted?(
                          <View style={styles.actions}>
                                    <View style={styles.listContainer}>
                                      <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.checkGyzo()}>
                                        <Text style={styles.listText}>가속도계</Text>
                                        {this.props.gyzo?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                      </TouchableOpacity>
                                    </View>
                                    <View style={styles.listContainer}>
                                      <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.checkSound()}>
                                          <Text style={styles.listText}>마이크</Text>
                                          {this.props.soundCheck?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                      </TouchableOpacity>
                                    </View>
                          </View>)
                          :(<View style={styles.actions}></View>)}


                          <View style={styles.settingContainer}>
                            <TouchableOpacity
                              onPress={this._wakeComplete}>
                                <Text style={styles.text}>기상 단계</Text>
                            </TouchableOpacity>
                          </View>
                          {wakeCompleted?(
                            <View style={styles.actions}>
                                      <View style={styles.listContainer}>
                                        <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selTime1()}>
                                            <Text style={styles.listText}>'10min'</Text>
                                            {this.props.isTime1?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.listContainer}>
                                        <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selTime2()}>
                                            <Text style={styles.listText}>'20min'</Text>
                                            {this.props.isTime2?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.listContainer}>
                                        <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selTime3()}>
                                            <Text style={styles.listText}>'30min(권장)'</Text>
                                            {this.props.isTime3?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.listContainer}>
                                        <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selTime4()}>
                                            <Text style={styles.listText}>'40min'</Text>
                                            {this.props.isTime4?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.listContainer}>
                                        <TouchableOpacity style={styles.testContainer} onPress={()=>this.props.selTime5()}>
                                            <Text style={styles.listText}>'50min'</Text>
                                            {this.props.isTime5?(<Icon name="checkmark" style={{color:"#00FF33"}}/>):(<Text></Text>)}
                                        </TouchableOpacity>
                                      </View>
                            </View>)
                            :(<View style={styles.actions}></View>)}


                    <View style={styles.settingContainer}>
                      <TouchableOpacity
                              onPress={this._jsonFunc}>
                          <Text style={styles.text}>도움말</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _testCheck = async() => {
      let test = await AsyncStorage.getItem('userData')
      test1 = JSON.parse(test)
      this.setState({
        value: test1
      })
      console.log(this.state.value)
    }

    _testStore = async() =>{
      console.log(testData)
      // ch = JSON.parse(testData)

      tmp = this.state.value
      console.log(tmp)
      tmp.push(testData)

      appendData = JSON.stringify(tmp)
      console.log(tmp)
      
      await AsyncStorage.setItem('userData', appendData)
      .then(()=>console.log('store success'))
      .catch(()=>console.log('fail'))
    }

    _jsonFunc = async() => {
      console.log('hi')

      text = dayJson.data
      test = monthJson.data

      let value = JSON.stringify(text)
      let value2 = JSON.stringify(test)

      await AsyncStorage.setItem('userData', value)
      .then(()=>console.log('store success'))
      .catch(()=>console.log('fail store'))
      await AsyncStorage.setItem('userDataMonth', value2)
      .then(()=>console.log('month store'))
      .catch(()=>console.log('month fail'))
    }

    // _storeJson

    _toggleMusicComplete = () =>{
      console.log('tc')
      this.setState(prevState => {
        return{
          musicCompleted: !prevState.musicCompleted
        }
      })
    }// 버튼을 누르면 이전 상태의 반대(ex>참이면 거짓)를 state에 주는거임

    _CheckComplete = () =>{
      this.setState(prevState => {
        return{
          checkCompleted: !prevState.checkCompleted
        }
      })
    }

    _wakeComplete = () =>{
      this.setState(prevState => {
        return{
          wakeCompleted: !prevState.wakeCompleted
        }
      })
    }

    _toggleComplete = () =>{
      this.setState(prevState => {
        return{
          isCompleted: !prevState.isCompleted
        }
      })
    }

    selectSleepCheck = (num) => {
      this.setState({
        gyzo: false,
        soundCheck: false
      })

      switch(num){
        case 1:
          return(
            this.setState({gyzo: true})
          )
        case 2:
          return(
            this.setState({soundCheck: true})
          )
      }
    }

    selectWake = (num) => {
      this.setState({
        isTime1: false,
        isTime2: false,
        isTime3: false,
        isTime4: false,
        isTime5: false
      })
      switch(num){
        case 1:
          return(
            this.setState({isTime1:true}))
        case 2:
          return(
            this.setState({isTime2:true}))
        case 3:
          return(
            this.setState({isTime3:true}))
        case 4:
          return(
            this.setState({isTime4:true}))
        case 5:
          return(
            this.setState({isTime5:true})
          )
      }
    }

}

const mapStateToProps = (state) => {

  return {
    isSound1: state.set.isSound1,
    isSound2: state.set.isSound2,
    isSound3: state.set.isSound3,
    isSound4: state.set.isSound4,
    isTime1: state.set.isTime1,
    isTime2: state.set.isTime2,
    isTime3: state.set.isTime3,
    isTime4: state.set.isTime4,
    isTime5: state.set.isTime5,
    gyzo: state.set.gyzo,
    soundCheck: state.set.soundCheck
  };
}

const mapDispatchToProps = (dispatch) => ({
  // return{
    selOne: () => dispatch(actions.setSoundA()),
    selTwo: () => dispatch(actions.setSoundB()),
    selThree: () => dispatch(actions.setSoundC()),
    selFour: () => dispatch(actions.setSoundD()),
    selTime1: () => dispatch(actions.setWakeTimeA()),
    selTime2: () => dispatch(actions.setWakeTimeB()),
    selTime3: () => dispatch(actions.setWakeTimeC()),
    selTime4: () => dispatch(actions.setWakeTimeD()),
    selTime5: () => dispatch(actions.setWakeTimeE()),
    checkGyzo: () => dispatch(actions.setCheckGyzo()),
    checkSound: () => dispatch(actions.setCheckSound())
  })


export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    title: {
      color: 'white',
      fontWeight: "300",
      marginTop: 50,
    },
    buttonContainer: {
      width: width,
      backgroundColor: 'red',
    },
    settingScroll: {
      marginTop: 30,
      alignItems: 'center'
    },
    actions: {
      flexDirection: 'column'
    },
    clicked:{
      backgroundColor: 'white'
    },
    uncliked:{
      backgroundColor: '#bbb'
    },
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
      fontSize: 15,
      borderBottomColor: "#bbb",
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      flexDirection: 'row'
    },
    listText:{
      width: width*0.8,
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
