let mongoose = require('mongoose');

let recipeModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  preparation: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  nbPortions: Number,
  prepTime: Number,
  cookTime: Number,
  extraTime: {
    time: Number,
    name: String
  },
  tags: [String],
  imageUrl: String,
  imageData: String
});

exports.module = mongoose.model('Recipe', recipeModel);
