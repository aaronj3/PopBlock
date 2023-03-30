const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const { isProduction } = require('../../config/keys');

// Attach restoreUser as a middleware before the route handler to gain access
// to req.user. (restoreUser will NOT return an error response if there is no
// current user.)
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  // if (!req.user) return res.json(null);
  // // res.json({
  // //   // _id: req.user._id,
  // //   // username: req.user.username,
  // //   // color: req.user.color
  // // });
  if (!req.user) return res.json({ user: null });
  const user = req.user;
  res.status(200).json({ user });
});

// Attach validateRegisterInput as a middleware before the route handler
router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure nobody has already registered with a duplicate username
  const user = await User.findOne({
    $or: [{ username: req.body.username }]
  });    
  
  if (user) {
    // Throw a 400 error if username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    console.log(err, "err_showing");
    return next(err);
  }

  // Otherwise create a new user
  const colors = ["#E74C3C", "#2980B9", "#1ABC9C", "#F39C12"];
  const newUser = new User({
    username: req.body.username,
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // Generate the JWT
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// Attach validateLoginInput as a middleware before the route handler
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { username: "Invalid credentials" };
      console.log(err, "err");
      return next(err);
    }
    // Generate the JWT
    console.log(user, "user");
    return res.json(await loginUser(user));
  })(req, res, next);
});

module.exports = router;