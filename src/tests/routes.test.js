const request = require('supertest');
const app = require('../index');
const Recipe = require('../models/recipeModel');
const connectDB = require('../config/dbConnect');
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Recipe Routes', () => {
  describe('GET /', () => {
    it('should return an empty array if no recipes exist', async () => {
      const res = await request(app).get('/api/v1/recipes');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipes retrieved successfully');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
      expect(res.body.totalPages).toBe(0);
      expect(res.body.currentPage).toBe(1);
    });

    it('should return recipes if they exist', async () => {
      // Create a sample recipe
      const recipe = new Recipe({
        title: 'Sample Recipe',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });
      await recipe.save();

      const res = await request(app).get('/api/v1/recipes');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipes retrieved successfully');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].title).toBe('Sample Recipe');
      expect(res.body.totalPages).toBe(1);
      expect(res.body.currentPage).toBe(1);
    });
  });

  // Test GET /api/v1/recipes/:id
  describe('GET /:id', () => {
    it('should return a recipe by ID', async () => {
      const recipe = new Recipe({
        title: 'Sample Recipe',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });
      await recipe.save();

      const res = await request(app).get(`/api/v1/recipes/${recipe._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipe retrieved successfully');
      expect(res.body.data.title).toBe('Sample Recipe');
    });

    it('should return 404 if the recipe does not exist', async () => {
      const res = await request(app).get(
        '/api/v1/recipes/60d5ec49d1b4f2c4e03cda3f',
      );
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Recipe not found');
    });
  });

  // Test POST /api/v1/recipes
  describe('POST /', () => {
    it('should create a new recipe', async () => {
      const res = await request(app)
        .post('/api/v1/recipes')
        .send({
          title: 'New Recipe',
          ingredients: ['Ingredient 1'],
          instructions: 'Instructions',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipe created successfully');
      expect(res.body.data.title).toBe('New Recipe');
    });
  });

  // Test PUT /api/v1/recipes/:id
  describe('PUT /:id', () => {
    it('should update an existing recipe', async () => {
      const recipe = new Recipe({
        title: 'Old Recipe',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });

      await recipe.save();
      const res = await request(app)
        .put(`/api/v1/recipes/${recipe._id}`)
        .send({
          title: 'Updated Recipe',
          ingredients: ['Ingredient 1'],
          instructions: 'Instructions',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipe updated successfully');
      expect(res.body.data.title).toBe('Updated Recipe');
    });

    it('should return 400 if validation fails', async () => {
      const recipe = new Recipe({
        title: 'Old Recipe',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });
      await recipe.save();

      const res = await request(app).put(`/api/v1/recipes/${recipe._id}`).send({
        instructions: 'Instructions',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors.some((e) => e.msg === 'Title is required')).toBe(
        true,
      );
      expect(
        res.body.errors.some((e) => e.msg === 'Ingredients are required'),
      ).toBe(true);
    });

    it('should return 404 if the recipe to update does not exist', async () => {
      const recipe = new Recipe({
        title: 'Old Recipe',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });
      await recipe.save();

      const res = await request(app)
        .put('/api/v1/recipes/60d5ec49d1b4f2c4e03cda3f')
        .send({
          title: 'Old Recipe',
          ingredients: ['Ingredient 1'],
          instructions: 'Instructions',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Recipe not found');
    });
  });

  // Test DELETE /api/v1/recipes/:id
  describe('DELETE /:id', () => {
    it('should delete a recipe', async () => {
      const recipe = new Recipe({
        title: 'Recipe to Delete',
        ingredients: ['Ingredient 1'],
        instructions: 'Instructions',
      });
      await recipe.save();

      const res = await request(app).delete(`/api/v1/recipes/${recipe._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Recipe deleted successfully');
    });

    it('should return 404 if the recipe to delete does not exist', async () => {
      const res = await request(app).delete(
        '/api/v1/recipes/60d5ec49d1b4f2c4e03cda3f',
      );
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Recipe not found');
    });
  });
});
