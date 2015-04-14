'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
} = React;
var SearchPage = require('./SearchPage');

class ForeignExchangeApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
          title: 'Foreign Exchange',
          component: SearchPage,
        }} />
    );
  }
};

AppRegistry.registerComponent('ForeignExchange', () => ForeignExchangeApp);

var styles = StyleSheet.create(require('./styles'));