const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  authors: [String],
  source: String,
  year: String,
  doi: String,
  type: String,
});

module.exports = Articles = mongoose.model("articles", ArticleSchema);
