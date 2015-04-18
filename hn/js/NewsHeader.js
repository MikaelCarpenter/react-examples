var $ = require('jquery');
var React = require('react');
var styles = require('../css/Styles');
var _ = require('lodash');

var NewsHeader = React.createClass({
	getLogo: function() {
		return (
			<div style={styles.newsHeaderLogo}>
				<a href='https://www.ycombinator.com'><img src='../img/y18.gif'/></a>
			</div>
		);
	},

	getTitle: function() {
		return (
			<div style={styles.newsHeaderTitle}>
				<a style={styles.newsHeaderTextLink} href='https://news.ycombinator.com'>Hacker News</a>
			</div>
		);
	},

	getNav: function() {
		var navLinks = [
			{
				name: 'new',
				url: 'newest'
			},
			{
				name: 'comments',
				url: 'newcomments'
			},
			{
				name: 'show',
				url: 'show'
			},
			{
				name: 'ask',
				url: 'ask'
			},
			{
				name: 'jobs',
				url: 'jobs'
			},
			{
				name: 'submit',
				url: 'submit'
			}
		];

		return (
			<div style={styles.newsHeaderNav}>
				{_(navLinks).map(function (navLink) {
					return (
						<a key={navLink.url} style={[styles.newsHeaderNavLink, styles.newsHeaderTextLink]} href={'https://news.ycombinator.com/' + navLink.url}>
							{navLink.name}
						</a>
					);
				}).value()}
			</div>
		);
	},

	getLogin: function() {
		return (
			<div style={styles.newsHeaderLogin}>
				<a style={styles.newsHeaderTextLink} href='https://news.ycombinator.com/login?whence=news'>login</a>
			</div>
		);
	},

	render: function() {
		return (
			<div style={styles.newsHeader}>
				{this.getLogo()}
				{this.getTitle()}
				{this.getNav()}
				{this.getLogin()}
			</div>
		);
	}
});

module.exports = NewsHeader;