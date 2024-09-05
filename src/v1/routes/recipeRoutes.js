const express = require('express');
const upload = require('../../middlewares/multer');

const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../../controllers/recipeController');
const {
  validationMiddleware,
  validateRecipe,
} = require('../../middlewares/validations/recipeValidation');

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post(
  '/',
  upload.single('image'),
  validateRecipe,
  validationMiddleware,
  createRecipe,
);
router.put(
  '/:id',
  upload.single('image'),
  validateRecipe,
  validationMiddleware,
  updateRecipe,
);
router.delete('/:id', deleteRecipe);

module.exports = router;
