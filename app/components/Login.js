import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  View,
  Alert,
  AsyncStorage,
} from 'react-native'
import { NavigationActions } from 'react-navigation';


import { Button } from 'react-native-elements';

import Loading from './Loading'
import renderIf from './renderIf'
import ApiUtils from '../utils/ApiUtils'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      isLoading: false,
      username: 'dandipangestu96@gmail.com',
      password: 'mainserong',
      status: true
    }
  }

  componentWillMount() {
    if(this.getCache()!=null){
        this.resetNavigation('HomeMenu')
    }
  }

  async getCache() {
    try {
      const test = await AsyncStorage.getItem('jwt')
      console.log(test)
      return test;
    }
    catch (e) {
      console.log('caught error', e);
      // Handle exceptions
    }
  }

  userLogin() {
    let { isLoading } = this.state
    this.setState({ isLoading: true })
    var data = {
      "email": this.state.username,
      "password": this.state.password,
      "firebaseToken": 'asdasdasd'
    }

    fetch("http://103.195.30.216:8080/nurbaya-service/login", {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(data)
    })
      .then(ApiUtils.checkStatus)
      .then(response => { return response.json() })
      .catch(e => {
        console.log('username salah')
        this.setState({ status: false })
      })
      .then(data => {
        {
          if (this.state.status) {
            var array = []
            for (let prop in data) {
              array.push(data[prop])
            }
            //this.doCache()
            //this.props.navigation.navigate('HomeMenu', { data: array })
            this.resetNavigation('HomeMenu')
          }
          else {
            Alert.alert('Username atau password anda salah')
          }
          this.setState({ isLoading: false })
        }
      })
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      type: 'Navigation/RESET',
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async doCache() {
    try {
      await AsyncStorage.setItem('jwt', 'test')
      console.log('harusnya udah masuk')
    }
    catch (e) {
      console.log('caught error', e);
      // Handle exceptions
    }
  }


  render() {
    return (
      <Image style={styles.backgroundImage} source={require('../assets/bg_login.jpg')}>
        <View style={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,.6)', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/movie_roll.png')} style={{ width: 100, height: 100, alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 30 }}>Movies Apps</Text>
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid='transparent'
              style={{ padding: 10, textDecorationLine: 'none' }}
              onChangeText={(text) => this.setState({ password: text })} onChangeText={(text) => this.setState({ username: text })}
            />
            <View style={{ height: 0.5, backgroundColor: 'white' }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              underlineColorAndroid='transparent'
              style={{ padding: 10, textDecorationLine: 'none' }}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <View style={{ height: 0.5, backgroundColor: 'white', marginBottom: 40 }} />
            <Button
              raised
              onPress={() => { this.userLogin() }}
              title="Login"
              textStyle={{ color: 'black' }}
              buttonStyle={{ backgroundColor: 'white' }}
            />
          </View>
        </View>
      </Image>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    flex: 1,
    width: null,
  },
});
