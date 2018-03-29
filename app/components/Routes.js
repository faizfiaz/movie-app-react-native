import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import Home from './Home'
import Top from './Top'
import Popular from './Popular'
import Login from './Login'
import Logout from './Logout'
import Cinema from './Cinema'
import DetailMovies from './DetailMovies'
import {
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native'

export const HomeMenu = DrawerNavigator({

  Home: {
    screen: Home,
    navigationOptions: {  
      title: 'Now Playing'
    },
  },
  Top: {
    screen: Top,
    navigationOptions: {
      title: 'Top Rated'
    },
  },
  Popular: {
    screen: Popular,
    navigationOptions: {
      title: 'Popular'
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      title: 'Capture Movie Ticket!'
    },
  },
  Cinema: {
    screen: Cinema,
    navigationOptions: {
      title: 'Find Cinema!'
    },
  },
}, {
    contentOptions: {
      style: {
        backgroundColor: 'black',
        flex: 1,
      },
      labelStyle: {
        color: 'white',
      },
    },
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerStyle: { backgroundColor: 'black' },
      title: 'Movie Apps',
      headerTintColor: 'white',
      headerLeft:
      <TouchableHighlight onPress={() =>
        navigation.navigate('DrawerOpen')}>
        <Image source={require('../assets/burger_menu.png')} style={{ width: 20, height: 20, marginLeft: 10, zIndex : 0 }} />
      </TouchableHighlight >
    })
  })

export const Stack = StackNavigator({
  Login: { screen: Login },
  HomeMenu: { screen: HomeMenu, },
  DetailMovies: { screen: DetailMovies }
  })

