const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const recipeRoutes = require('./v1/routes/recipeRoutes');
const cors = require('cors');
require('dotenv').config();

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1/recipes', recipeRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`),
    ),
  )
  .catch((err) => console.log(err));
