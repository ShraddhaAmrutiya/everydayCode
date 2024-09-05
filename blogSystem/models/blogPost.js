const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
     required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports= mongoose.model('BlogPost',blogSchema)