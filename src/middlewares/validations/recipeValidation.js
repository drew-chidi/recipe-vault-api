const { check, validationResult, body } = require('express-validator');

const validateRecipe = [
  body('title').notEmpty().withMessage('Title is required'),
  body('ingredients').notEmpty().withMessage('Ingredients are required'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
];

// Middleware to check for validation errors
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        type: 'field',
        msg: err.msg,
        path: err.param,
        location: err.location,
      })),
    });
  }
  next();
};

module.exports = {
  validateRecipe,
  validationMiddleware,
};
