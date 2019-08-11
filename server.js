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
        // Scrapping P Text
        result.text = $(this).children('p').text()
        // scraping link to article 
        result.link = $(this).children('a').attr('href')

        db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle)
        })
        .catch(function(err) {
            console.log(err)
        })
    })
    res.send('Scrape Completed')
  })
})

app.get('/article', function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle)
    })
    .catch(function(err) {
        console.log(err)
        res.json(err)
    })
})

app.get('/article/:id', function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate('note')
        .then(function(dbArticle) {
            res.json(dbArticle)
    })
    .catch(function(err) {
        console.log(err)
        res.json(err)
    })
})

app.post('/articles/:id', function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        console.log(err)
        res.json(err)
    })
})

/*
**************** Starting Server *******************
*/

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;