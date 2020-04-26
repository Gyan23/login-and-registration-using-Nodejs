var express = require('express');
var session = require('express-session');

var todoController = require('./controllers/customer-Controller');

var app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

todoController(app);

app.listen(3000);

console.log("runnig 3000 port");