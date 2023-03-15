const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');

/* GET posts listing. */
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate("author", "_id username").sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
})


router.post('/:id', requireUser, async (req, res, next) => {
  const newComment = new Comment({
    author: req.user._id,
    post: req.params.id,
    body: req.body.text,
  })

  let comments = await newComment.save()
  return res.json(comments);
})

router.delete("/:id", requireUser, async (req, res, next) => {
  const comments = await Comment.findById(req.params.id);

  if (comments && comments.author._id.toString() == req.user._id ) {
    comments.deleteOne();
  } else {
    console.log("No permissions")
    return res.json({result:false});
  }
  return res.json({result:true});
})

module.exports = router;
