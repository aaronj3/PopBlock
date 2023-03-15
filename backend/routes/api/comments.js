const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');

// GET all comments listing.
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate("author", "_id username").populate("post").sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.json([{ message: "Error retrieving comments" }]);
  }  
});

// GET a single comment with it's id.
router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("author", "_id username").populate("post");
    return res.json(comment);
  }
  catch(err) {
    const error = new Error('Comment not found');
    error.statusCode = 404;
    error.errors = { message: "No comment found with that id" };
    return next(error);
  }
})

// GET comments that belongs to a specific post.
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("author", "_id username").populate("post").sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.json([{ message: "Error retrieving comments" }]);
  }  
});

// GET comments that belongs to a specific user.
router.get('/user/:userId', requireUser, async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const comments = await Comment.find({ author: user._id })
                                  .sort({ createdAt: -1 })
                                  .populate("author", "_id username").populate("post");
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
})

// POST (create) comment that belongs to a specific post.
router.post('/:postId', requireUser, async (req, res, next) => {
  const newComment = new Comment({
    author: req.user._id,
    post: req.params.postId,
    body: req.body.body,
  })  


  let comments = await newComment.save()
  return res.json(comments);
});

// Update a comment by it's id
router.put('/:id', requireUser, async (req, res, next) => {
  const { body } = req.body;
  const { id } = req.params;
  
  try {
    const comment = await Comment.findById(id).populate("author", "_id username").populate("post");
    
    if (!comment) {
      const err = new Error('Comment not found');
      err.statusCode = 404;
      err.errors = { message: "No comment found with that id" };
      return next(err);
    }
    
    if (comment.author._id.toString() !== req.user._id) {
      const err = new Error('Unauthorized');
      err.statusCode = 401;
      err.errors = { message: "You are not authorized to update this comment" };
      return next(err);
    }
    
    comment.body = body;
    const updatedComment = await comment.save();
    
    // Find the post that the comment belongs to
    const post = await Post.findById(comment.post);
    
    // Return the updated comment with the post data included
    return res.json({
      _id: updatedComment._id,
      author: updatedComment.author,
      body: updatedComment.body,
      post: post._id
    });

  }
  catch(err) {
    next(err);
  }
});

// DELETE comment.
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const comments = await Comment.findById(req.params.id);

    if (comments && comments.author._id.toString() === req.user._id) {
      comments.deleteOne();
      return res.json({ result: true });
    } else {
      console.log("No permissions")
      return res.json({ result: false });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
