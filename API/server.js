const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cowsay = require('cowsay')
const chalk = require('chalk')
const favicon = require('express-favicon');
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../dist")));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

require("./config/session.js")(app);  ``
// var routes_setter = require('./config/routes.js');
// routes_setter(app);
// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)
app.listen(port, function() {
  console.clear()
  console.log(chalk.cyan(cowsay.say({
    text: `server now running on port ${port}`,
    f: 'octopus'
  })))
});
