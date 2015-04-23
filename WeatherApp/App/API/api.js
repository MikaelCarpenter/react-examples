var api = {
	baseUrl: 'http://api.openweathermap.org/data/2.5/',
	dailtForecastUrl: 'forecast/daily',
	currentWeatherUrl: 'weather',
	key: '', //API key not needed but recommended
	getDailyForecastUrl: function() {
		return this.baseUrl + this.dailtForecastUrl;
	},
	getCurrentWeatherUrl: function() {
		return this.baseUrl + this.currentWeatherUrl;
	}
}

module.exports = api;