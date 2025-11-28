const mongoose = require("mongoose");

const cultureSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  wekia: { type: String },
  category: { type: String }
});

module.exports= mongoose.model('Culture', cultureSchema);
