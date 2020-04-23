var express = require('express');
var todoController = require('./controllers/customer-Controller');

var app = express();

//app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000);

console.log("runnig 3000 port");