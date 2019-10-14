const mongoose = require('mongoose'); 

// Save reference to Schema constructor

const Schema = mongoose.Schema; 

// Use Schema constructor to create new UserSchema obj

const ArticleSchema = new Schema({
  title: {
    type: String, 
    require: true, 
    unique: true
  }, 

  summary: {
    type: String
  }, 
  link: {
    type: String, 
    required: true
  }, 

  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment'
  }]
}); 

// This creates our model from the schema using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema); 

// Export the Article model
module.exports = Article; 