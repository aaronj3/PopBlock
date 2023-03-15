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
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "_id username").sort({ "like.length": -1 });
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

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
                              .sort({ "like.length": -1 })
                              .populate("author", "_id username");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "_id username");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
})

router.get('/area/:areaId', async (req, res, next) => {
  try {
    const post = await Post.find({ area: req.params.areaId}).populate("author", "_id username");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
})

router.delete('/:id', requireUser, async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  if (post && post.author._id.toString() == req.user._id ) {
    post.deleteOne();
  } else {
    console.log("No permissions")
    return res.json({result:false});
  }
  return res.json({result:true});
})

router.post('/', requireUser, validatePostInput, imageUploader.single('image'), async (req, res, next) => {
  try {
    const newPost = new Post({
      url: req.file?.location,
      area: req.body.area,
      author: req.user._id,
      content: req.body.content,
    });
    console.log(newPost);
    // let post = await newPost.save();
    // post = await post.populate('author', '_id username');
    //return res.json({result: "ok"})
    return "ok";
    // return res.json(post);
  }
  catch(err) {
    next(err);
  }
});

router.post('/:id/like', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "_id username");
    const user_id = req.user._id;

    if (post.like.includes(user_id)) {
       post.like = post.like.filter(s => s != user_id)
    } else {
       post.like.push(user_id);
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
})

module.exports = router;