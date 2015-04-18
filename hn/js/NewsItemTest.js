var $ = require('jquery');
var React = require('react');
var NewsItem = require('./NewsItem');
var styles = require('../css/Styles');

$.ajax({
	url: '/json/items.json'
}).then(function (items) {
	console.log('items', items);
	React.render(<NewsItem item={items[0]} rank={1}/>, $('#content')[0]);
});