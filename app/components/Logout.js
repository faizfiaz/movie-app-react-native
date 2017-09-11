import React, { Component } from 'react'
import {
    Alert,
    Text,
    Dimensions,
    Image,
    View,
} from 'react-native'
import { Button } from 'react-native-elements';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Logout extends Component {

    render() {
        return (
            <View style={{width: width, height: height, backgroundColor: 'black' }}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', margin: 20 }}>Get point from capture your Movie ticket{"\n"}and reedem your point with any voucher in this Apps </Text>
                <View style={{ width: 200, height: height / 2, alignItems:'center', alignContent:'center',alignSelf:'center', margin: 20, backgroundColor: 'white' ,justifyContent: 'center'}}>
                    <Image source={require('../assets/two_tickets.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center', alignItems:'center', alignContent:'center'}} />
                </View>
                <Button
                    onPress={() => this.openImagePicker()}
                    title='Capture Now'
                    textStyle={{ color: 'black' }}
                    buttonStyle={{ backgroundColor: 'white' }}
                    style={{width: width, margin: 20 }}
                />
            </View>
        )
    }

    openImagePicker() {

    }


}