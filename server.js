// Dependencies

const express = require('express'); 
const logger = require('morgan'); 
const mongoose = require('mongoose'); 

// Require all models

const db = require('./models'); 

const PORT = process.envPORT || 3000; 

// Initialize Express
const app = express(); 

// Configure Middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });

// Routes
require('./routes/api_routes.js')(app);
require('./routes/html_routes.js')(app); 

// Start the server
app.listen(PORT, function() {
  console.log('App running on port ' + PORT); 
}); 
