const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cowsay = require('cowsay')
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../dist")));

require("./config/session.js")(app);
var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.clear()
  console.log(cowsay.say({
    text: `server now running on port ${port}`,
    f: 'sheep'
  }))
});
