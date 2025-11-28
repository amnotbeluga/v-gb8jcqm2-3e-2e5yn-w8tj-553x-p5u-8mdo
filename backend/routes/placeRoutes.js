const express = require("express");
const Place = require("../models/placeModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(category, "i") }; // case-insensitive
    }

    const places = await Place.find(filter);
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch places" });
  }
});



// Add new place
router.post("/create", async (req, res) => {
  const newPlace = new Place(req.body);
  await newPlace.save();
  res.json({ message: "Place added", newPlace });
});

// ✅ Correct: Get single place WITH NEARBY PLACES populated
router.get("/details/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate("nearbyPlaces");
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch place details" });
  }
});

// Get single place WITHOUT populate
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch place" });
  }
});

// Edit
router.put("/:id", async (req, res) => {
  try {
    const updated = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Place updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

  // Add review to a place
router.post("/:id/reviews", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    place.reviews.push(req.body);
    await place.save();
    res.json({ message: "Review added", place });
  } catch (err) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Get reviews for a place
router.get("/:id/reviews", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place.reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
