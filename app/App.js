import React, { Component } from 'react'
import {
    AppRegistry,
    Text,
    View
} from 'react-native'

import Login from './components/Login'
import Loading from './components/Loading'
import {Stack} from './components/Routes'


export default class App extends Component {
    render() {
        return (
            <Stack />
        )
    }
}
