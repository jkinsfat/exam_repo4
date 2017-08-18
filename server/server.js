const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const HOST = 8000

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../public/dist')));

let session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

require('./config/mongoose.js');
var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(HOST, function() {
console.log('listening on port ' + HOST);
})
