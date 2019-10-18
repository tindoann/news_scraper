// Required packages
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

// Configure middleware

module.exports = function (app) {

  let resultsArr = [];

  // A GET route for scraping the echoJS website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://news.ycombinator.com").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      $('.storylink').each(function (index, element) {

        // An empty array to save the data that we'll scrape
        let results = {};

        results.title = $(this)
          .text();
        results.link = $(this)
          .attr('href');
        results.site = $(this)
          .siblings('span')
          .children('a')
          .children('span')
          .text();
        resultsArr.push(result);

      });

      console.log('resultArr.length');

      // Create a new Article using the `result` object built from scraping

      db.Article.create(results)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    // Direct to the homepage 
    res.redirect("/");
  });

  // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
    // Grabs all the document in the articles collection
    db.Article.find({}).then(function (dbArticle) {
        // If we are able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client 
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate with comments
  app.get("/article/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db 
    db.Article.find({
        _id: req.params.id
      })
      // ..and populate all of the notes associated with it
      .populate("comments")
      .then(function (selectedArticle) {
        // If we were able to successfully find an article with the given id, send it back to the client
        res.json(selectedArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route to save a new comment
  app.post('/comment/:id', function (req, res) {
    db.Comment.create(req.body)
      .then(function (dbComment) {
        return db.Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            comments: dbComment._id
          }
        }, {
          new: true
        });
      }).then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Route to delete a comment
  app.post('/delete/comment/:id', function (req, res) {

  })
}