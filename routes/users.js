const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');

//Users index
router.get('/', auth.requireLogin, (req, res, next) => {
  User.find({}, 'username').
  then((users) => res.render('users/index', { users: users }))
  .catch ((err) => console.error(err));
});

// Users new
router.get('/new', (req, res, next) => {
  res.render('users/new');
})

// Users create
router.post('/', (req, res, next) => {
  const user = new User(req.body);
  user.save().then(()=> res.redirect('/users')).catch((err) => console.log(err));
})

module.exports = router;
