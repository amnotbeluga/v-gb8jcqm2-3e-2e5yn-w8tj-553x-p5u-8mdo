const express = require("express");
const Culture = require("../models/cultureModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Culture.find();
  res.json(data);
});

// PUT THIS FIRST
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const items = await Culture.find({ category });

  if (!items.length) {
    return res.status(404).json({ message: "No cultures found in this category" });
  }
  res.json(items);
});

// PUT THIS LAST
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await Culture.findOne({ id });
  if (!item) return res.status(404).json({ message: "Culture not found" });
  res.json(item);
});

module.exports = router;
