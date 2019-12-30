const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const TWO_HOURS = 1000 * 60 * 60 * 2;

const home = require('./routes/home');
const users = require('./routes/users');
const entries = require('./routes/entries');

app.use(cookieSession({
    name: 'session',
    keys: ['s!M#cUUHXW67b#t'],
    maxAge: TWO_HOURS
}))

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home);
app.use('/users', users);
app.use('/entries', entries);

// heroku requires port to be served to 8080
var port = process.env.PORT || 8080;

// set the home page route
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});