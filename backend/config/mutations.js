const express = require("express");
const { v4 } = require("uuid");

const router = express.Router();

const Article = require("../models/article");

//Specifically for creating a new article, status is submitted by default
router.post("/", (req, res) => {
  const data = req.body.data;

  const article = new Article({
    _id: v4(),
    ...data,
    authors: data.authors.split(","),
    status: "Submitted",
    recommends: "x",
  });

  article.save(function (err) {
    if (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res
          .status(403)
          .json({ success: false, message: "Article already submitted" });
      }
    }
    res
      .status(201)
      .send({ success: false, message: "Article submitted successfully" });
  });
});

router.post("/reject/", (req, res) => {
  if (!req.body._id) {
    return;
  }
  Article.updateOne({ _id: req.body._id }, { status: "Rejected" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post("/pending/", (req, res) => {
  if (!req.body._id) {
    return;
  }
  Article.updateOne({ _id: req.body._id }, { status: "Pending" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post("/approve/", (req, res) => {
  if (!req.body._id) {
    return;
  }
  Article.updateOne({ _id: req.body._id }, { status: "Approved" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post("/type/", (req, res) => {
  if (!req.body._id || !req.body.type) {
    return;
  }

  Article.updateOne({ _id: req.body._id }, { type: req.body.type }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
