'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var t = require('tcomb-form-native');
var {
	View,
	TouchableHighlight,
	Text
} = React;
var Form = t.form.Form;

var todo = t.struct({
	txt: t.Str,
	complete: t.Bool
});

var options = {
	fields: {
		txt: {
			label: 'To-Do Item',
			placeholder: 'enter a to do item here',
			autoFocus: true
		}
	}
};

var todoEdit = React.createClass({

	onUpdate() {
		var value = this.refs.form.getValue();
		if(value) {
			this.props.update(value, this.props.id);
		}
	},

	render() {
		return (
			<View style={styles.todo}>
				<Form
					ref='form'
					type={todo}
					onChange={this._onChange}
					options={options}
					value={this.props.item} />
				<TouchableHighlight
					style={[styles.button, styles.saveButton]}
					onPress={this.onUpdate}
					underlayColor='#99d9f4'>
						<Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
			</View>
		);
	}
});

module.exports = todoEdit;