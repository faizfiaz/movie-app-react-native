import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          color="white"
          size="large"
          style={{margin: 15}}
        />

        <Text>
          Loading data...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
