import React, { Component } from 'react'
import Toast from 'react-native-simple-toast'
import {
    Text,
    Linking,
    View,
    Dimensions,
    TouchableHighlight,

} from 'react-native'
import MapView from 'react-native-maps';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Cinema extends Component {

    constructor() {
        super()
        this.state = {
            address: [],
            latLng: [],
            name: [],
            markers: [{
                title: 'Blitz Megaplex',
                description: 'Blitz Megaplex Jalan yang benar nomor 1',
                coordinates: {
                    latitude: -6.387503,
                    longitude: 106.8128593
                },
                image: '../assets/blitz.jpg'
            },
            {
                title: 'CGV Cinema',
                description: 'CGV Cinema Jalan yang benar nomor 2',
                coordinates: {
                    latitude: -6.391414,
                    longitude: 106.8378983,
                },
                image: '../assets/cgv.jpg'
            }]
        }
    }

    componentWillMount() {
        //this.loadListCinema()
    }

    loadListCinema() {
        var array = []
        var addressData = []
        var nameCinema = []
        fetch('https://api.londontheatredirect.com/rest/v2/Venues', {
            method: "GET",
            headers: {
                'Api-Key': 'n9m5y6rem5vufe863thunwzs',
                'X-Originating-Ip': '103.213.131.29',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                for (let prop in data) {
                    array.push(data[prop])
                }
                for (let i = 0; i < array[0].length; i++) {
                    addressData[i] = array[0][i]['Address']
                    nameCinema[i] = array[0][i]['Name']
                }
                this.setState({ name: nameCinema })
            })
            .done(() => {
                this.loadLatLngAddress(addressData)

            })
    }

    loadLatLngAddress(data) {
        var latlngList = []
        for (let i = 0; i < data.length; i++) {
            if (data[i] != null) {
                fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + data[0] + '&sensor=true', {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        var array = []
                        for (let prop in data) {
                            array.push(data[prop])
                        }
                        if (array[0][0]['geometry'] != null) {
                            latlngList[i] = array[0][0]['geometry']['location']
                        } else {
                            latlngList[i] = 'isi'
                        }
                    })
                    .done(() => {

                    })
            }
        }
        this.setState({ latLng: latlngList })
        this.setMarker(latlngList)
    }

    setMarker(data) {
        var markers = []
        console.log(data)
        for (let i = 0; i < this.state.name.length; i++) {
            if (data[i].equals('isi')) {
                // test: {
                //     title: 'asd'
                //     coordinates: {
                //         latitude = data[i].lat
                //         longitude = data[i].lng
                //     }
                // }
                markers[i] = 'test'
            }
        }
        console.log(markers)
    }

    render() {
        return (
            <MapView
                style={{ width: width, height: height}}
                region={{
                    latitude: -6.3878438,
                    longitude: 106.7477569,
                    latitudeDelta: 0.043,
                    longitudeDelta: 0.034

                }}>

                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.coordinates}
                        title={marker.title}
                        pinColor={'tan'}>
                        <MapView.Callout tooltip style={{
                            backgroundColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, overflow: 'hidden'
                        }} onPress={() => { this.toast(marker.coordinates) }}>
                            <TouchableHighlight>
                                <View>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>{marker.title}{"\n"}{marker.description}</Text>
                                </View>
                            </TouchableHighlight>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}
            </MapView>
        )
    }

    toast(data) {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`);
    }
}