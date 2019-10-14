const mongoose = require('mongoose'); 

// Save reference to Schema 

const Schema = mongoose.Schema; 

// Create a new CommentSchema obj

const CommentSchema = new Schema({
  comment: {
    type: String, 
    required: true, 
    validate: [
      // Function takes in the new 'longstring' value to be saved as an argument
      function(input) {
      // If this returns true, proceed. If not, return the error message below

        return input.length >= 15; 
      }, 

      // Error message
      'Your comment has to be at least 15 characters.'
    ]
  }, 
  userCreated: {
    type: Date, 
    default: Date.now
  }, 

  lastUpdated: {
    type: Date, 
    default: Date.now
  }, 

  article: {
    type: Schema.Types.ObjectId, 
    ref: 'Article', 
    required: true
  }
}); 

// Create the model from the schema using mongoose's model method
const Comment = mongoose.model('Comment', CommentSchema); 

// Export the comment model
module.exports = Comment; 