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

  mrp: {
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
    
  },


  coverImage: {
    type: String,
    required: true,
  }

,

  createdBy: {
  type: String,
  required: true,
},

ratings: [
  {
    userId: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
],

reviews: [
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
],



});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;