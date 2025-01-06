const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  Categories: {
    type: [String],
  },
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
