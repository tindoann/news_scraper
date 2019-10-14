// Dependencies 

const path = require('path'); 

module.exports = function(app) {
  //Route to index.html
  app.get('/', function(req, res) {
    res.render('index'); 

 app.get('*', function(req, res) {
   res.render('404'); 
 })
})

}