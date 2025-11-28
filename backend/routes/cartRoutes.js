const express = require("express");
const Cart = require("../models/cartModel.js");
const router = express.Router();

// ADD ITEM TO CART
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) cart = new Cart({ userId, items: [] });

  const existing = cart.items.find((item) => item.productId === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  await cart.save();
  res.json(cart.items);
});

// REMOVE ITEM
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter((item) => item.productId !== productId);

  await cart.save();
  res.json(cart.items);
});

router.post("/increase", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  const item = cart.items.find(i => i.productId === productId);
  if (item) item.quantity += 1;

  await cart.save();
  res.json(cart.items);
});

router.post("/decrease", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  const item = cart.items.find(i => i.productId === productId);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.items = cart.items.filter(i => i.productId !== productId);
  }

  await cart.save();
  res.json(cart.items);
});


// GET CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) return res.json({ items: [] });
  res.json(cart.items);
});

module.exports = router;
