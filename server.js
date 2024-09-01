const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const recipeRoutes = require('./src/routes/recipeRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/recipes', recipeRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));
