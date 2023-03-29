const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User')
const { requireUser } = require('../../config/passport');

// // GET all comments listing.
// router.get('/', async (req, res) => {
//   try {
//     const comments = await Comment.find().populate("author").populate("post").sort({ createdAt: -1 });
//     return res.json(comments);
//   }
//   catch(err) {
//     return res.json([{ message: "Error retrieving comments" }]);
//   }
// });


// // GET comments that belongs to a specific user.
// router.get('/user', requireUser, async (req, res, next) => {
//   let user;
//   try {
//     user = await User.findById(req.user._id);
//   } catch(err) {
//     const error = new Error('User not found');
//     error.statusCode = 404;
//     error.errors = { message: "No user found with that id" };
//     return next(error);
//   }
//   try {
//     const comments = await Comment.find({ author: user._id })
//                                   .sort({ createdAt: -1 })
//                                   .populate("author").populate("post");
//     return res.json(comments);
//   }
//   catch(err) {
//     return res.json([]);
//   }
// })

// // GET a single comment with it's id.
// router.get('/:id', async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.id).populate("author").populate("post");
//     return res.json(comment);
//   }
//   catch(err) {
//     const error = new Error('Comment not found');
//     error.statusCode = 404;
//     error.errors = { message: "No comment found with that id" };
//     return next(error);
//   }
// })

// // GET comments that belongs to a specific post.
// router.get('/post/:postId', async (req, res) => {
//   try {
//     const comments = await Comment.find({ post: req.params.postId }).populate("author").populate("post", "_id").sort({ createdAt: -1 });
//     return res.json(comments);
//   }
//   catch(err) {
//     return res.json([{ message: "Error retrieving comments" }]);
//   }
// });

// // POST (create) comment that belongs to a specific post.
// router.post('/:postId', requireUser, async (req, res, next) => {
//   const newComment = new Comment({
//     author: req.user._id,
//     post: req.params.postId,
//     body: req.body.body
//   })


//   let comments = await newComment.save()
//   return res.json(comments);
// });

// // Update a comment by it's id
// router.put('/:id', requireUser, async (req, res, next) => {
//   const { body } = req.body;
//   const { id } = req.params;

//   try {
//     const comment = await Comment.findById(id).populate("author").populate("post");

//     if (!comment) {
//       const err = new Error('Comment not found');
//       err.statusCode = 404;
//       err.errors = { message: "No comment found with that id" };
//       return next(err);
//     }

//     if (comment.author._id.toString() !== req.user._id.toString()) {
//       const err = new Error('Unauthorized');
//       err.statusCode = 401;
//       err.errors = { message: "You are not authorized to update this comment" };
//       return next(err);
//     }

//     comment.body = body;
//     const updatedComment = await comment.save();

//     // Find the post that the comment belongs to
//     // const post = await Post.findById(comment.post);

//     // Return the updated comment with the post data included
//     return res.json({
//       _id: updatedComment._id,
//       author: updatedComment.author,
//       body: updatedComment.body,
//       post: updatedComment.post._id
//     });

//   }
//   catch(err) {
//     next(err);
//   }
// });

// // DELETE comment.
// router.delete("/:id", requireUser, async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     // console.log(comment)
//     // console.log(`COMMENT AUTHOR: ${comment.author._id}`)
//     // console.log(`REQ USER ID: ${req.user._id} `)
//     // console.log(`TESTING: ${comment.author._id.toString() === req.user._id.toString()}`)

//     if (comment && comment.author._id.toString() === req.user._id.toString()) {
//       console.log("Delete successful");
//       comment.deleteOne();
//       return res.json({ result: true });
//     } else {
//       console.log("No permissions")
//       return res.json({ result: false });
//     }
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// });

// module.exports = router;
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate("author").populate("post").sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.status(500).json({ error: "Error retrieving comments" });
  }
});

router.get('/user', requireUser, async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user._id);
  } catch(err) {
    return res.status(404).json({ error: "No user found with that id" });
  }
  try {
    const comments = await Comment.find({ author: user._id })
                                  .sort({ createdAt: -1 })
                                  .populate("author").populate("post");
    return res.json(comments);
  }
  catch(err) {
    return res.status(500).json({ error: "Error retrieving comments" });
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("author").populate("post");
    return res.json(comment);
  }
  catch(err) {
    return res.status(404).json({ error: "No comment found with that id" });
  }
})

router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("author").populate("post", "_id").sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.status(500).json({ error: "Error retrieving comments" });
  }
});

router.post('/:postId', requireUser, async (req, res, next) => {
  const newComment = new Comment({
    author: req.user._id,
    post: req.params.postId,
    body: req.body.body
  })

  try {
    const savedComment = await newComment.save();
    return res.json(savedComment);
  }
  catch(err) {
    return res.status(500).json({ error: "Error creating comment" });
  }
});

router.put('/:id', requireUser, async (req, res, next) => {
  const { body } = req.body;
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id).populate("author").populate("post");

    if (!comment) {
      return res.status(404).json({ error: "No comment found with that id" });
    }

    if (comment.author._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "You are not authorized to update this comment" });
    }

    comment.body = body;
    const updatedComment = await comment.save();

    return res.json({
      _id: updatedComment._id,
      author: updatedComment.author,
      body: updatedComment.body,
      post: updatedComment.post._id
    });

  }
  catch(err) {
    return res.status(500).json({ error: "Error updating comment" });
  }
});

// DELETE comment.
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment && comment.author._id.toString() === req.user._id.toString()) {
      await comment.deleteOne();
      return res.json({ result: true });
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this comment" };
      return next(error);
    }
  } catch (err) {
    console.error(err);
    const error = new Error("Server error");
    error.statusCode = 500;
    error.errors = { message: "An error occurred while trying to delete the comment" };
    return next(error);
  }
});

module.exports = router;
