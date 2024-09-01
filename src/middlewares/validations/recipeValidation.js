const { check, validationResult } = require('express-validator');

// Validation rules for recipe creation
const validateRecipe = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title should not exceed 100 characters'),

  check('ingredients').notEmpty().withMessage('Ingredients are required'),

  check('instructions').notEmpty().withMessage('Instructions are required'),
];

// Middleware to check for validation errors
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRecipe,
  validationMiddleware,
};
