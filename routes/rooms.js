const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Room = require('../models/room');

// Rooms index
router.get('/', (req, res, next) => {
    Room.find({}, 'topic').
    then((rooms) => res.render('rooms/index', { rooms: rooms }))
    .catch ((err) => console.error(err));
});

// Rooms new
router.get('/new', auth.requireLogin, (req, res, next) => {
    res.render('rooms/new');
  });

// Rooms show
router.get('/:id', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.id)
  .then((room) => res.render('rooms/show', { room: room }))
  .catch ((err) => console.error(err));
});

// Rooms edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.id)
  .then((room) => res.render('rooms/edit', { room: room }))
  .catch ((err) => console.error(err));
});

// Rooms update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.redirect('/rooms/' + req.params.id))
  .catch ((err) => console.error(err));
});

// Rooms create
router.post('/', auth.requireLogin, (req, res, next) => {
    const room = new Room(req.body);
    room.save().then(()=> res.redirect('/rooms')).catch((err) => console.log(err));
});

module.exports = router;