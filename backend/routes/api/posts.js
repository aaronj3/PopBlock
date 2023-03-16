const path = require('path')
const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validation/posts');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3()

/* GET posts listing. */
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().populate("author", "_id username").sort({ "likes.length": -1 });
//     return res.json(posts);
//   }
//   catch(err) {
//     return res.json([]);
//   }
// })

const allowedExtensions = ['.png', '.PNG','.jpg', '.jpeg', '.bmp', '.mov', '.MOV']
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'popblock',
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? ''
      const extension = path.extname(file.originalname)
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('wrong extension'))
      }
      const randomName = Math.random().toString(36).substring(7);
      callback(null, `${uploadDirectory}/${Date.now()}_${randomName}${extension}`)
    },
  }),
})

// GET all posts listing.
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate("author").sort({ "likes.length": -1 });
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
});

// GET a single post with it's id.
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});


// GET posts that belongs to a specific user.
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
    const posts = await Post.find({ author: user._id })
                              .sort({ "likes.length": -1 })
                              .populate("author");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
});

// GET posts that belongs to a specific area.
router.get('/area/:areaId', async (req, res, next) => {
  try {
    const post = await Post.find({ area: req.params.areaId}).populate("author");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
})

// router.delete('/:id', requireUser, async (req, res, next) => {
//   const post = await Post.findById(req.params.id)
//   if (post && post.author._id.toString() == req.user._id ) {
//     post.deleteOne();
//   } else {
//     console.log("No permissions")
//     return res.json({result:false});
//   }
//   return res.json({result:true});
// })

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validatePostInput as a middleware before the 
// route handler.

// Create a new post.
router.post('/', requireUser, validatePostInput, imageUploader.single('image'), async (req, res, next) => {
  try {
    const newPost = new Post({
      url: req.file?.location,
      area: req.body.area,
      author: req.user._id,
      content: req.body.content,
    });

    let post = await newPost.save();
    post = await post.populate('author');
    return res.json(post);
  }
  catch(err) {
    next(err);
  }
});

// Add like to a post
router.post('/:id/likes', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    const user_id = req.user._id;

    if (post.likes.includes(user_id)) {
       post.likes = post.likes.filter(s => s != user_id)
    } else {
       post.likes.push(user_id);
    }
    post.save()
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

// Update post.
router.put('/:id', requireUser, validatePostInput, async (req, res, next) => {
  const { area, content } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author");

    if (!post) {
      const err = new Error('Post not found');
      err.statusCode = 404;
      err.errors = { message: "No post found with that id" };
      return next(err);
    }

    if (post.author._id.toString() !== req.user._id) {
      const err = new Error('Unauthorized');
      err.statusCode = 401;
      err.errors = { message: "You are not authorized to update this post" };
      return next(err);
    }

    post.area = area;
    post.content = content;

    const updatedPost = await post.save();
    return res.json(updatedPost);
  }
  catch(err) {
    next(err);
  }
});

// DELETE post.
router.delete('/:id', requireUser, async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  if (post && post.author._id.toString() === req.user._id ) {
    post.deleteOne();
  } else {
    console.log("No permissions")
    return res.json({result:false});
  }
  return res.json({result:true});
});


module.exports = router;