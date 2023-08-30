const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');
const commentsRouter = require('./comments');

// Posts new
router.get('/new', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId)
    .then((room) => res.render('posts/new', { room: room }))
    .catch ((err) => console.error(err));
});

// Posts create
router.post('/', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId)
    .then ((room) => {
        const post = new Post(req.body);
        post.room = room;
        post.save().then(()=> res.redirect(`/rooms/${room._id}`)).catch((err) => console.log(err));
    })
    .catch ((err) => console.log(err));
})

router.use('/:postId/comments', commentsRouter);
module.exports = router;