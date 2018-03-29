import React, { Component } from 'react'
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';
import {
    ScrollView,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableHighlight,
    Button
} from 'react-native'
import renderIf from './renderIf'
import Loading from './Loading'

var width = Dimensions.get('window').width;

export default class Popular extends Component {
    static navigationOptions = {
        drawerLabel: 'Popular',
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
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=43954c2d8a99381ff77508aeaa6d3a1a', { method: "GET" })
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

    itemClicked(data){
        this.props.navigation.navigate('DetailMovies', {data : data})
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => { this.itemClicked(rowData) }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        indicator={Progress.Pie}
                        indicatorProps={{
                            size: 10,
                            borderWidth: 0,
                            color: 'rgba(0, 0, 0, 1)',
                            unfilledColor: 'rgba(0, 0, 0, 0.2)'
                        }}
                        style={{ width: width * 0.5, height: 300, alignItems: 'center' }}
                        source={{ uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path }}
                    />
                </View>
            </TouchableHighlight>
        )
    }   
}
