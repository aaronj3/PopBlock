const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePostInput = [
  handleValidationErrors
];

module.exports = validatePostInput;