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
  });
  
  article.save(function(err) {
    if(err) {
      if(err.name === "MongoServerError" && err.code === 11000){
        return res.status(403).json({success: false, message: 'Article already submitted'});
      } 
    }
    res.status(201).send({success: false, message: 'Article submitted successfully'});
  });
});

module.exports = router;
