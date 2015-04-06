// enables strict mode for better js
'use strict';
// obv, lets us use react
var React = require('react-native');
// requiring the searchPage class from SearchPage.js
var SearchPage = require('./SearchPage');
// creates a stylesheet, called styles, and a property within it, called text, that we can assign to components
var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
})
// the initial 'Hello World' component. No longer necessary
class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

// components for Property Finder
class PropertyFinderApp extends React.Component {
  render() {
    return(
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

// Making the components show up
React.AppRegistry.registerComponent('PropertyFinder', function() {
  return PropertyFinderApp
});