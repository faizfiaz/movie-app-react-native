import React, { Component } from 'react'
import{
  AppRegistry,

} from 'react-native'

import App from './app/App'

export default class MovieApps extends Component {

  render(){
    return (
      <App/>
    )
  }
}

AppRegistry.registerComponent('MovieApps', () => MovieApps);
