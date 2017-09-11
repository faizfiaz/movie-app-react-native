import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    Button
} from 'react-native'
import renderIf from './renderIf'
import Loading from './Loading'

var width = Dimensions.get('window').width;

export default class Top extends Component {
    static navigationOptions = {
        drawerLabel: 'Top Rated',
    };

    constructor() {
        super()
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row1', 'row2', 'row3', 'row4']),
            isLoading: true
        };
    }

    componentDidMount() {
        this.loadJSONData();
    }

    loadJSONData() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=43954c2d8a99381ff77508aeaa6d3a1a', { method: "GET" })
            .then((response) => response.json())
            .then((data) => {

                var array = []
                for (let prop in data) {
                    array.push(data[prop])
                }
                console.log(array)
                var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({ dataSource: ds.cloneWithRows(array[3]) });
            })
            .done(() => {
                this.setState({ isLoading: false })
            })
    }


    render() {
        const { state } = this.props.navigation
        return (
            <View style={{ backgroundColor: 'black' }}>
                {renderIf(this.state.isLoading)(
                    <Loading />)}
                <ListView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    dataSource={this.state.dataSource}
                    renderRow={rowData => this.renderRow(rowData)}
                />
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View style={{alignItems: 'center' }}>
                <Image
                    defaultSource={require('../assets/bg_login.jpg')}
                    style={{ width: width * 0.5, height: 300, alignItems: 'center' }}
                    source={{ uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path }}
                />
            </View>
        )
    }
}
