import React, { Component } from 'react'
import {
    Alert,
    Text,
    Dimensions,
    Image,
    View,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Button } from 'react-native-elements';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var options = {
    title: 'Choose Image Sourcer',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

export default class Logout extends Component {

    constructor(){
        super()
        this.state={
            avatarSource: ''
        }
    }

    render() {
        return (
            <View style={{width: width, height: height, backgroundColor: 'black' }}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', margin: 20 }}>Get point from capture your Movie ticket{"\n"}and reedem your point with any voucher in this Apps </Text>
                <View style={{ width: 200, height: height / 2, alignItems:'center', alignContent:'center',alignSelf:'center', margin: 20, backgroundColor: 'white' ,justifyContent: 'center'}}>
                    <Image source={require('../assets/two_tickets.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center', alignItems:'center', alignContent:'center'}} />
                    <Image source={this.state.avatarSource} style={{width: 200, height: height / 2, alignItems:'center', alignContent:'center',alignSelf:'center', margin: 20, backgroundColor: 'white' ,justifyContent: 'center'}} />
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
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
    }


}