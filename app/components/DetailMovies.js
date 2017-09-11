import React, { Component } from 'react'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { Tab, TabLayout } from 'react-native-android-tablayout';
import {
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    TouchableHighlight,
} from 'react-native'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class DetailMovies extends Component {
    static navigationOptions = {
        title: 'Detail Movies',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        labelStyle: { color: 'white' }
    };

    constructor() {
        super()
        this.state = {
            movieId: '',
            videoId: '',
            isi: '',
            array: []
        }

    }

    componentWillMount() {
        isi = this.props.navigation
        for (let prop in isi) {
            this.state.array.push(isi[prop])
        }
        console.log(this.state.array)
    }

    loadMoviesVideo(id) {
        fetch('http://api.themoviedb.org/3/movie/' + id + '/videos?api_key=43954c2d8a99381ff77508aeaa6d3a1a', { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                var array = []
                for (let prop in data) {
                    array.push(data[prop])
                }
                console.log(array)
                this.runVideos(array[1][0]['key'])
            })
            .done(() => {

            })
    }

    runVideos(videoId) {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: ' AIzaSyBXaBj14v3UmAWLAgIVi01F-PZrA9qzS7o ',
            videoId: videoId,
            autoplay: true,
            startTime: 0,
        })
            .then(() => console.log('Standalone Player Exited'))
            .catch(errorMessage => console.error(errorMessage))
    }

    render() {
        //const { state } = this.props.navigation
        //this.setState({movieId: state.params.data.id})
        return (
            <ScrollView style={{ backgroundColor: 'black' }}>
                <TouchableHighlight onPress={() => this.loadMoviesVideo(this.state.array[1]['params']['data']['id'])}>
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w342' + this.state.array[1]['params']['data']['backdrop_path'] }} style={{ width: width, height: height / 3 }}>
                        <View style={{ width: width, height: height / 3, backgroundColor: 'rgba(0,0,0,.6)', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/play_button.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                        </View>
                    </Image>
                </TouchableHighlight>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View>
                        <Image source={{ uri: 'https://image.tmdb.org/t/p/w342' + this.state.array[1]['params']['data']['poster_path'] }} style={{ width: width * 0.4, height: 250, margin: 20 }} />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, marginRight: 10 }} >
                        <Text style={{ marginTop: 20, color: 'white', flexWrap: 'wrap', alignItems: 'flex-start', fontWeight: 'bold', fontSize: 20 }}>{this.state.array[1]['params']['data']['title']}</Text>
                        <Text style={{ color: 'white', fontSize: 9 }}>Release Date : {this.state.array[1]['params']['data']['release_date']}</Text>
                        <Text style={{ color: 'white', fontSize: 12, marginTop: 10, textAlign: 'justify' }}>{this.state.array[1]['params']['data']['overview']}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Rating : {this.state.array[1]['params']['data']['vote_average']} / 10 </Text>
            </ScrollView>
        )
    }
}