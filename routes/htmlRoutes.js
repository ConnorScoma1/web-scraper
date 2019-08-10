var path = require("path");

module.exports = function (app) {

  //load index
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname +"/../public/index.html"));
  });

  app.get("*", function (req, res) {
    res.render("404");
  });
}