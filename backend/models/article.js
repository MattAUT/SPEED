const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  authors: [String],
  source: String,
  year: Number,
  doi: String,
  type: String,
  status: String,
  recommends: String,
});

module.exports = Articles = mongoose.model("articles", ArticleSchema);
