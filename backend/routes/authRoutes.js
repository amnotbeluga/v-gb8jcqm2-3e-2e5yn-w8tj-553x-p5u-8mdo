const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ success: false, message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashed,
    isAdmin: false 
  });

  await newUser.save();

  res.json({ success: true, message: "Signup successful!" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) return res.json({ success: false, message: "Incorrect password" });

  const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: { name: user.name, email: user.email, isAdmin: user.isAdmin ,_id: user._id},
  });
});

module.exports = router;
