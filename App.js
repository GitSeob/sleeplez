import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, AppRegistry} from 'react-native';
import {createStackNavigator, StackNavigator} from 'react-navigation';
import mainscreen from './components/mainscreen';
import { Provider } from 'react-redux';
import store from "./store"
// let store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store= {store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  main:{
    screen: mainscreen,
    navigationOptions: {
      header: null,
    }
  },
})