const express = require('express');
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
router.post('/', createRecipe, validateRecipe, validationMiddleware);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
