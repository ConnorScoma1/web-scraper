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

/* 
*************************************
************* Routes ****************
*************************************
*/

app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/", function(response) {
    var $ = cheerio.load(res.data);

    $('css-7douaa eqveam60').each(function(i, el) {
        //Object to store scrapped info
        var result = {}
        //Scraping the Title
        result.title = $(this).children('h2').text()

        result.text = $(this).children('p').text()

        result.link = $(this).children('a').attr('href')
    })
  })
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;