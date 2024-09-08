const Recipe = require('../models/recipeModel');
const cloudinary = require('../config/cloudinary');

// Get all recipes
exports.getRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit, 10))
      .skip((page - 1) * limit)
      .exec();

    const count = await Recipe.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      data: recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, instructions } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image: imageUrl,
    });

    await newRecipe.save();

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing recipe
exports.updateRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, instructions } = req.body;
    let imageUrl = '';

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } else {
      imageUrl = recipe.image;
    }

    // Update the recipe with the new data
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.image = imageUrl;

    await recipe.save();

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    if (recipe.image) {
      const publicId = recipe.image.split('/').pop().split('.')[0];

      await cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Error deleting image from Cloudinary',
          });
        }
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
