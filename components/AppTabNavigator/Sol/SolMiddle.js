import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get("window")

class SolMiddel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.solContainer}>
          <Image source={require('../icons/success1.png')} style={{}}/>
          <Text style={styles.test1}>업데이트 날짜 : {this.props.update}</Text>
          <Text style={styles.test2}>권장 수치</Text>
              <View style={styles.statusContainer}>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>권장 수면 시작</Text>
                  <Text style={styles.dataAvg}>{this.props.sleepTime}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>권장 커피 수</Text>
                  <Text style={styles.dataAvg}>{this.props.coffee}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>권장 운동 시간</Text>
                  <Text style={styles.dataAvg}>{this.props.exerTime}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.dataTitle}>권장 식사 시간</Text>
                  <Text style={styles.dataAvg}>{this.props.lastEat}</Text>
                </View>
              </View>
        </View>
    );
  }
}

export default SolMiddel;

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
      height:height*0.1,
      flexDirection: 'row',
      // borderColor:'white',
      borderWidth: 1,
    },
    content: {
      width: width*0.45,
      // height: height*0.15,
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
    test1: {
      textAlign:'center',
      width: 200,
      marginTop: 10,
      marginBottom: height*0.05,
      color: 'white'
    },
    test2: {
      textAlign:'center',
      width: 200,
      marginTop: 10,
      color: 'white'
    },
})