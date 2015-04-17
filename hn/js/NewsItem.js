var $ = require('jquery');
var React = require('react');
var styles = require('../css/styles')

var NewsItem = React.createClass({
	render: function() {
		return (
			<div style={newsItem}>
				<a style={newsItemTitleLink} href={this.props.item.url}>{this.props.item.title}</a>
			</div>
		);
	}
});

module.exports = NewsItem;