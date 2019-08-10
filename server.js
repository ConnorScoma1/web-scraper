var express = require("express");
var mongo = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
