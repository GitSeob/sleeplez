import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import { Icon } from 'native-base';
import { createMaterialTopTabNavigator, StackNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import HomeTab from './AppTabNavigator/HomeTab';
import SolutionTab from './AppTabNavigator/SolutionTab';
import StatisticTab from './AppTabNavigator/StatisticTab';
import OnAlarm from './AppTabNavigator/OnAlarm';
import LoginPage from './LoginPage';
import { connect } from 'react-redux'

const {width, height} = Dimensions.get("window");

class mainscreen extends Component{

    // static navigationOptions = {
    // headerRight: <Icon name='android-settings' style={{paddingRight:10}} />,
    // }

    render(){
        let { flgLogin } = this.props
        if( this.props.flgLogin ){
            return (
                <AppTabNavigator />
            )
        }
        return <LoginPage />
    }
}
// mapStateToProps = (state) => {
//     return(
//         flgLogin: state.login.flgLogin
//     )
// }

export default connect(state => ({ flgLogin: state.login.flgLogin }))(mainscreen);

// const Application = StackNavigator({
//         Home: { screen: LoginPage },
//         Profile: { screen: AppTabNavigator}
//     }, {
//         navigationOptions: {
//             header: false,

//         }
//     }
// )

const AppTabNavigator = createMaterialTopTabNavigator({
    Alarm:{
        screen: OnAlarm
    },
    Statistic:{
        screen: StatisticTab
    },
    Solution:{
        screen: SolutionTab
    },
    Setting:{
        screen: HomeTab
    }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    pressOpacity: true ,
    tabBarOptions: {
        style: {
          backgroundColor: 'black',
          height: height*0.08,
        },
        iconStyle:{

        },
        tabStyle:{

        },
        labelStyle:{
          fontSize: 8
        },
        activeTintColor: 'red',
        inactiveTintColor: '#d1cece',
        showLabel: true,
        showIcon: true,

    }
  }
);
