'use strict';
var styles = require('./application/styles/styles');
var todoListContainer = require('./application/components/todoListContainer');
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS
} = React;

class ToDoApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{component: todoListContainer, title: 'TO DOs'}} />
    );
  }
}

AppRegistry.registerComponent('todoList', () => ToDoApp);