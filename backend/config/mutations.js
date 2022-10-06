const express = require("express");
const { v4 } = require("uuid");

const router = express.Router();

const Article = require("../models/article");

router.post("/", (req, res) => {
  const data = req.body.data;
  const article = new Article({
    _id: v4(),
    ...data,
    authors: data.authors.split(","),
  });

  article.save();
});

module.exports = router;
