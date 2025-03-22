const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // Age must be a numeric value and at least 18
    body('age')
      .isInt({ min: 18 }).withMessage('Age must be a number and at least 18'),

    // Name must be a string with at least 3 characters
    body('name')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    // Email must be a valid email address
    body('email')
      .isEmail().withMessage('Email must be a valid email address'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};