var _ = require('lodash');
var NewsHeader = require('./NewsHeader');
var NewsItem = require('./NewsItem');
var React = require('react');
var styles = require('../css/Styles');

var NewsList = React.createClass({
	getMore: function() {
		return (
			<div style={styles.newsListMore}>
				<a style={styles.newsLestMoreLink} href='https://news.ycombinator.com/news?p=2'>More</a>
			</div>
		);
	},

	render: function() {
		return (
			<div style={styles.newsList}>
				<NewsHeader />
				<div style={styles.newsListNewsItems}>
					{_(this.props.items).map(function (item, index) {
						return <NewsItem key={item.id} item={item} rank={index + 1} />;
					}.bind(this)).value()}
				</div>
				{this.getMore()}
			</div>
		);
	}
});

module.exports = NewsList;