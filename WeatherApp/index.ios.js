'use strict';

var React = require('react-native'),
  SearchView = require('./App/Views/SearchView');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var WeatherApp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigatorContainer}
        tintColor='#6bbd6d'
        initialRoute={{
          title: 'Search',
          component: SearchView
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('WeatherApp', () => WeatherApp);