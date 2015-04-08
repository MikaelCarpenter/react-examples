var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var port = Number(process.env.PORT || 1989);

var app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});