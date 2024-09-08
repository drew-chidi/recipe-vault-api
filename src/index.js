const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const recipeRoutes = require('./v1/routes/recipeRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const allowedOrigins = ['https://recipe-vault-web.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

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
