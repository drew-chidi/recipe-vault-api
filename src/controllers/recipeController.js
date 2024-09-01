const Recipe = require('../models/recipeModel');

// Utility function for successful responses
const sendSuccessResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    success: true,
    message: message || 'Request successful',
    data: data,
  });
};

// Utility function for error responses
const sendErrorResponse = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({
    success: false,
    message: errorMessage || 'An error occurred',
  });
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    sendSuccessResponse(res, 200, recipes, 'Recipes retrieved successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return sendErrorResponse(res, 404, 'Recipe not found');
    }
    sendSuccessResponse(res, 200, recipe, 'Recipe retrieved successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    sendSuccessResponse(res, 201, newRecipe, 'Recipe created successfully');
  } catch (error) {
    sendErrorResponse(res, 400, error.message);
  }
};

// Update an existing recipe
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return sendErrorResponse(res, 404, 'Recipe not found');
    }
    sendSuccessResponse(res, 200, updatedRecipe, 'Recipe updated successfully');
  } catch (error) {
    sendErrorResponse(res, 400, error.message);
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return sendErrorResponse(res, 404, 'Recipe not found');
    }
    sendSuccessResponse(res, 200, null, 'Recipe deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

// const Recipe = require('../models/recipeModel');

// exports.getRecipes = async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getRecipeById = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createRecipe = async (req, res) => {
//   try {
//     const newRecipe = new Recipe(req.body);
//     await newRecipe.save();
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateRecipe = async (req, res) => {
//   try {
//     const updatedRecipe = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedRecipe);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteRecipe = async (req, res) => {
//   try {
//     await Recipe.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Recipe deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
