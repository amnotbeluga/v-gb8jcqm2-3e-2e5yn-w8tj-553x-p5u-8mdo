const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
app.use(cors());

const authRoutes = require('./routes/authRoutes.js');
const placeRoutes = require('./routes/placeRoutes.js');
//const Place = require('./models/placeModel.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const cultureRoutes=require('./routes/cultureRoutes.js')

// Server & DB config
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Jharkhand Tourism Backend!');
});

// Connect to MongoDB and Seed Data
mongoose
  .connect(mongoURL)
  .then(async () => {
    console.log("Connected to MongoDB");

    //await seedInitialPlaces(); // seed run here
  })
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cultures',cultureRoutes)

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
