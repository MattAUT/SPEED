const express = require("express");
const router = express.Router();

const Article = require("../models/article");

router.get("/", (req, res) => {
  Article.find({}).then((articles) => res.json(articles));
});

module.exports = router;
