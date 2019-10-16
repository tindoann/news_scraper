// Required packages
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

// Configure middleware

module.exports = function (app) {

  // A GET route for scraping the echoJS website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://news.ycombinator.com").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      let results = {};

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("td.title").each(function (i, element) {

        // Save the text of the element in a 'title' variable 
        const title = $(element).text();

        // In the currently selected element, look at its child element
        // then save the values for any 'href attributes that the child element may have

        const link = $(element).children().attr('href');

        // Save these results in an object that we'll push into the results array we defined eariler

        results.push({
          title: title,
          link: link
        });

      // Log the results once we looped throught all the elements found with cheerio
      console.log(results);

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
    res.render("/")
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grabs all the document in the articles collection
  db.Article.find({}).then(function(dbArticle){
  // If we are able to successfully find Articles, send them back to the client
  res.json(dbArticle); 
  })
  .catch(function(err){
    // If an error occurred, send it to the client 
    res.json(err); 
  }); 
});
}