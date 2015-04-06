'use strict';
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;
var styles = ({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: 'blue'
  },
  label: {
    marginBottom: 30
  }
});

var tapCount = React.createClass({
  getInitialState() {
    return{
      score: 0
    }
  },
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.label}>{'Score: ' + this.state.score}</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'white'}
          onPress={() => this.setState({score: ++this.state.score})}>
          <Text style={styles.button}>Tap</Text>
        </TouchableHighlight>
      </View>
    );
  }
})

React.AppRegistry.registerComponent('tapCount', function() {
  return tapCount
});
module.exports = tapCount;