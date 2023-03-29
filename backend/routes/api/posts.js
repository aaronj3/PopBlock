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

const allowedExtensions = ['.png', '.PNG','.jpg', '.jpeg', '.bmp', '.mov', '.MOV', '.JPEG', '.JPG']
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

// router.get('/likes',async (req, res, next) => {
//   try {
//     const post = await Post.aggregate([
//       // Select the `area` and `likes` fields, and populate the `author` field.
//       {
//         $project: {
//           area: 1,
//           likes: 1,
//           author: 1,
//         },
//       },
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'author',
//           foreignField: '_id',
//           as: 'author',
//         },
//       },
//       {
//         $unwind: '$author',
//       },
//       // Group by `area`.
//       {
//         $group: {
//           _id: '$area',
//           // Sort the `likes` field in descending order.
//           max_likes: {
//             $max: '$likes',
//           },
//           // Select the first document in each group.
//           doc: {
//             $first: '$$ROOT',
//           },
//         },
//       },
//       // Select the `author` field from the selected document.
//       {
//         $project: {
//           _id: 0,
//           area: '$_id',
//           author: '$doc.author',
//         },
//       },
//     ]);

//     return res.json(post);
//   }
//   catch(err) {
//     const error = new Error('Post not found');
//     error.statusCode = 404;
//     error.errors = { message: "No post found with that id" };
//     return next(error);
//   }
// });

router.get('/likes',async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      // Select the `area` and `likes` fields, and populate the `author` field.
      {
        $project: {
          area: 1,
          likes: 1,
          author: 1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      // Group by `area`.
      {
        $group: {
          _id: '$area',
          // Get the maximum `likes` array field length in each group.
          max_likes: { $max: { $size: '$likes' } },
          // Sort the documents within each group by the `likes` array field length in descending order.
          docs: { $push: { doc: '$$ROOT', likesCount: { $size: '$likes' } } },
        }
      },
      {
        $project: {
          _id: 0,
          area: '$_id',
          // Get the first document in the sorted list of documents in each group.
          author: { $arrayElemAt: ['$docs.doc.author', { $indexOfArray: ['$docs.likesCount', '$max_likes'] }] }
        }
      },
    ]);

    return res.json(posts);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

// GET posts that belongs to a specific user.
router.get('/user', requireUser, async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user._id);
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


// GET posts that belongs to a specific area.
// router.get('/area/:areaId', async (req, res, next) => {
//   try {
//     const posts = await Post.find({ area: req.params.areaId}).populate("author").sort({ "likes.length": -1 });
//     return res.json(posts);
//   }
//   catch(err) {
//     const error = new Error('Post not found');
//     error.statusCode = 404;
//     error.errors = { message: "No post found with that id" };
//     return next(error);
//   }
// })
router.get('/area/:areaId', async (req, res, next) => {
  try {
    const posts = await Post.find({ area: req.params.areaId })
      .populate("author")
      .lean()
      .exec();

    const postsWithLikesCount = posts.map(post => ({
      ...post,
      likes_count: post.likes ? post.likes.length : 0
    }));

    const sortedPosts = postsWithLikesCount.sort((a, b) => b.likes_count - a.likes_count);

    return res.json(sortedPosts);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});




// Create a new post.
router.post('/', requireUser, validatePostInput, imageUploader.single('image'), async (req, res, next) => {
  try {
    const newPost = new Post({
      url: req.file.location,
      area: req.body.area,
      author: req.user._id,
      content: req.body.content,
      likes: []
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
  const content = req.body.content;
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author");

    if (!post) {
      const err = new Error('Post not found');
      err.statusCode = 404;
      err.errors = { message: "No post found with that id" };
      return next(err);
    }

    if (post.author._id.toString() !== req.user._id.toString()) {
      const err = new Error('Unauthorized');
      err.statusCode = 401;
      err.errors = { message: "You are not authorized to update this post" };
      return next(err);
    }

    // post.area = area;
    post.content = content;

    const updatedPost = await post.save();
    // return res.json(updatedPost);
    return res.json({
      _id: updatedPost._id,
      author: updatedPost.author,
      url: updatedPost.url,
      likes: updatedPost.likes,
      area: updatedPost.area,
      content: updatedPost.content
    });
  }
  catch(err) {
    next(err);
  }
});

// DELETE post.
router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post && post.author._id.toString() === req.user._id.toString()) {
      console.log("Delete successful");
      post.deleteOne();
      return res.json({ result: true });
    } else {
      console.log("No permissions")
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this post" };
      return next(error);
    }
  } catch (err) {
    console.error(err);
    const error = new Error('Server error');
    error.statusCode = 500;
    error.errors = { message: "There was a problem deleting the post" };
    return next(error);
  }
});



module.exports = router;