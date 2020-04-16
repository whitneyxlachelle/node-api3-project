const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving post.",
      })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId(), (req, res) => {
  posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "Post was removed.",
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing post.",
      })
    })
});

router.put('/:id', validatePostId(), validatePost(), (req, res) => {
  posts.update(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating post.",
      })
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then((post) => {
        if (post) {
          // this makes the post object available to later middleware functions
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: "Posts not found.",
          })
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving post.",
        })
      })
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data",
      })
    } else if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field",
      })
    }
    next();
  }
}

module.exports = router;
