var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

// Web Scrapping Tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require Models
var db = require("./models");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Mongoose Set up 
mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;