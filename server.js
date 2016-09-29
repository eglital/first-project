var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var api = require("./myapi.js");

app.use(express.static('public'));
api(app);
app.listen(port, function(){});