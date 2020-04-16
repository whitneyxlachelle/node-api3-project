const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// validates the user id on every request that expects a user id parameter
function validateUserId() {
  return (req, res, next) => {
    users.findById(req.params.id)
      .then((user) => {
        if (user) {
          // if the id parameter is valid, store that user object as req.user
          req.user
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
      res.status(400).json({
        message: "missing required name field",
      })
    }
    next();
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
