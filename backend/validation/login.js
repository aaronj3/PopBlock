const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateLoginInput is a combination Express middleware that uses the check
// middleware to validate the keys in the body of the request to login a user
const validateLoginInput = [
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  handleValidationErrors
];

module.exports = validateLoginInput;