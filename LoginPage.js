import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage, 
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions'
import dayJson from '../jsonFile/dayJson.json'
import monthJson from '../jsonFile/monthJson.json'
// import { StackNavigator } from 'react-navigation'

// const Application = StackNavigator({

// })

let userid = ''

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      flg: false,
    };
  }

  componentDidMount() {
    this._loadIntialState()
  }

  _loadIntialState = async () => {
    var value = await AsyncStorage.getItem('user')
    if(value !== null){
      userid = value
      this.props.loginFunc()
    }
  }


  render() {
    let {flgLogin} = this.props;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Login
          </Text>
          <TextInput
            style={styles.textInput} placeholder='UserID'
            onChangeText={(username) => this.setState({username})}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style={styles.textInput} placeholder='UserPW'
            onChangeText={(password) => this.setState({password})}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>this._login()}>   
            <Text>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    ); 
  }

  _login = async() => {
    //database
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

    await fetch('http://13.209.211.60:3030/user', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username" : this.state.username,
        "password" : this.state.password
      })
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      if(res.success === true){
        AsyncStorage.setItem('user', res.user)
      }
      else{
        alert(res.message)
        // this.props.loginFunc()
      }
    })
    .catch(err => alert(err))

    this._loadIntialState()
  }

}

mapStateToProps = (state) => {
  return {
    flgLogin: state.login.flgLogin
  }
}

mapDispatchToProps = dispatch => ({
  loginFunc: () => {
    dispatch(actions.requestLogin(userid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "red",
    padding:20,
    alignItems: 'center'
  }
})