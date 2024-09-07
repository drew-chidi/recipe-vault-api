const express = require('express');
const request = require('supertest');
const app = express();
const errorHandler = require('../middlewares/errorHandler');

// Mock a controller method to throw an error
app.get('/recipes', (req, res, next) => {
  const error = new Error('Test error');
  error.statusCode = 500;
  next(error);
});

app.use(errorHandler);

describe('Error Handling Middleware', () => {
  it('should return a 500 error with proper message', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Test error');
  });
});
