'use strict';
var React = require('react-native');
var SearchResults = require('./SearchResults');
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;
var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48bbec',
		borderColor: '#48bbec',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec',
		borderRadius: 8,
		color: '#48bbec'
	},
	image: {
		width: 217,
		height: 138
	}
})
// indep fxn that transforms the text into proper syntax
function urlForQueryAndPage(key, value, pageNumber) {
	var data = {
		country: 'uk',
		pretty: '1',
		encoding: 'json',
		listing_type: 'buy',
		action: 'search_listings',
		page: pageNumber
	};
	data[key] = value;

	var querystring = Object.keys(data)
		.map(key => key + '=' + encodeURIComponent(data[key]))
		.join('&');

	return 'http://api.nestoria.co.uk/api?' + querystring;
}
// Components
// touchable highlight is a component that becomes transparent and reveals an underlay color when tapped
class SearchPage extends Component {
	// creating a state, searchString, with an initial value of 'london'
	constructor(props) {
		super(props);
		this.state = {
			searchString: 'london',
			isLoading: false,
			message: ''
		};
	}
	render() {
		// ternary if statement: adds an activity indicator or an empty view
		var spinner = this.state.isLoading ?
			( <ActivityIndicatorIOS
					hidden='true'
					size='large' /> ) :
			( <View/>);
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
					Search for houses to buy!
				</Text>
				<Text style={styles.description}>
					Search by place-name, postcode or search near your location.
				</Text>
				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this.onSearchTextChanged.bind(this)}
						placeholder='Search via name or postcode'/>
					<TouchableHighlight style={styles.button}
							onPress={this.onSearchPressed.bind(this)}
							underlayColor='#99d9f4'>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>
				<TouchableHighlight style={styles.button}
						onPress={this.onLocationPressed.bind(this)}
						underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>
				<Image source={require('image!house')} style={styles.image}/>
				{spinner}
				<Text style={styles.description}>{this.state.message}</Text>
			</View>
		);
	}
	// .bind(this) above is to ensure that 'this' in this fxn is referring to the TextInput
	onSearchTextChanged(event) {
		this.setState({ searchString: event.nativeEvent.text });
	}
	_executeQuery(query) {
		console.log(query);
		this.setState({ isLoading: true });
		fetch(query)
			.then(response => response.json())
			.then(json => this._handleResponse(json.response))
			.catch(error =>
				this.setState({
					isLoading: false,
					message: 'Something bad happened ' + error
			}));
	}
	onSearchPressed() {
		var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
		this._executeQuery(query);
	}
	_handleResponse(response) {
		this.setState({ isLoading: false, message: '' });
		if (response.application_response_code.substr(0, 1) === '1') {
			this.props.navigator.push({
				title: 'Results',
				component: SearchResults,
				passProps: {listings: response.listings}
			})
		} else {
			this.setState({ message: 'Location not recognized; please try again.'});
		}
	}
	onLocationPressed() {
		navigator.geolocation.getCurrentPosition(
			location => {
				var search = location.coords.latitude + ',' + location.coords.longitude;
				this.setState({ searchString: search });
				var query = urlForQueryAndPage('centre_point', search, 1);
				this._executeQuery(query);
			},
			error => {
				this.setState({
					message: 'There was a problem with obtaining your location: ' + error
				});
			}
		);
	}
}

// exporting to be used in index.ios.js or any other file
module.exports = SearchPage;