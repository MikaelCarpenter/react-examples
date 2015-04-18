var $ = require('jquery');
var React = require('react');
var styles = require('../css/Styles');
var url = require('url');
var moment = require('moment');

var NewsItem = React.createClass({
	getDomain: function() {
		return url.parse(this.props.item.url).hostname;
	},

	getCommentLink: function() {
		var commentText = 'discuss';
		if (this.props.item.kids && this.props.item.kids.length) {
			commentText = this.props.item.kids.length + ' comments';
		}

		return (
			<a style={styles.newsItemSubtextA} href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
		);
	},

	getSubtext: function() {
		return (
			<div style={styles.newsItemSubtext}>
				{this.props.item.score} points by <a style={styles.newsItemSubtextA} href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
			</div>
		);
	},

	getTitle: function() {
		return(
			<div style={styles.newsItemTitle}>
				<a style={styles.newsItemTitleLink} href={this.props.item.url}>{this.props.item.title}</a>
				<span className="newsItem-domain">
          ({this.getDomain()})
        </span>
			</div>
		);
	},

	getRank: function() {
		return (
			<div style={styles.newsItemRank}>
				{this.props.rank}
			</div>
		);
	},

	getVote: function() {
		return (
			<div style={styles.newsItemVote}>
				<a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&whence=news'}>
					<img src='../img/grayarrow2x.gif' width='10' />
				</a>
			</div>
		);
	},

	render: function() {
		return (
			<div style={styles.newsItem}>
				{this.getRank()}
				{this.getVote()}
				<div style={styles.newsItemItemText}>
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</div>
		);
	}
});

module.exports = NewsItem;