


// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Make LibrarySchema a Schema
var LibrarySchema = new Schema({
  // name: a unique string
  name: {
    type: String,
    unique: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
  }]
});

// Save the Library model using the LibrarySchema
var Library = mongoose.model("Library", LibrarySchema);

// Export the Library model
module.exports = Library;
