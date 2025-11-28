const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  video1: { type: String },
  video2: { type: String },
  category: { type: String },
  location: { type: String },
  bestTimeToVisit: { type: String },
  about: { type: String },
  readmore: { type: String },
  arembed: { type: String },
  reviews: [
    {
      user: { type: String },
      rating: { type: Number },
      comment: { type: String },
      createdBy: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  nearbyPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
});

module.exports = mongoose.model("Place", placeSchema);
