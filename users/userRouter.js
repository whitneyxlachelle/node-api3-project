const express = require('express');
const users = require('./userDb');
//const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error: unable to add user.",
      })
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  users.insert(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error: unable to create post.",
      })
    })
});

router.get('/', (req, res) => {
  users.get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts.",
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', validateUserId(), (req, res) => {
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts by users id.",
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  users.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Cannot remove user.",
      })
    })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating user",
      })
    })
});

//custom middleware

// validates the user id on every request that expects a user id parameter
function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (user) {
          // if the id parameter is valid, store that user object as req.user
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: "invalid user id",
          })
        }
      })
      .catch((error) => {
        next(error);
      })
  }
}

// validateUser validates the body on a request to create a new user
function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data",
      })
    } else if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field",
      })
    } else {
      next();
    }
  }
}

// validatePost validates the body on a request to create a new post
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
