const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  publisher: {  
    type: String,
    required: true,
  },

  yearOfPublish: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  pages: {
    type: Number,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  
  subCategory: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },


  coverImage: {
    type: String,
    required: true,
  }

,

  createdBy: {
  type: String,
  required: true,
}

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;