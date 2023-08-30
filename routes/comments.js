const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');
const Comment = require('../models/comment');

// Comments new
router.get('/new', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId)
    .then((room) => {
        Post.findById(req.params.postId)
        .then((post) => res.render('comments/new', { room: room, post: post }))
        .catch ((err) => console.error(err));
    })
    .catch ((err) => console.error(err));
});

// Comments create
router.post('/', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId)
    .then ((room) => {
        Post.findById(req.params.postId)
        .then((post) => {
            let comment = new Comment(req.body);
            post.comments.unshift(comment);
            post.save().
            then(()=> {
                comment.save().then(() => res.redirect(`/rooms/${room._id}`)).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch ((err) => console.error(err));
    })
    .catch ((err) => console.log(err));
})

module.exports = router;