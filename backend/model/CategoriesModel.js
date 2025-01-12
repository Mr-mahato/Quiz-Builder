const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const categoriesSchema = new Schema({
  index: {
    type: Number,
    required: true, // Ensures the index is mandatory
  },
  quizId:{
    type:String,
    required:true
  },
  question: {
    type: String,
    required: true, // Ensures the question is mandatory
  },
  categories: [
    {
      category: {
        type: String,
        required: true, // Ensures each category has a name
      },
      data: {
        type: [Schema.Types.Mixed], // Can hold an array of any type (e.g., strings, numbers, objects)
        default: [], // Defaults to an empty array if not provided
      },
    },
  ],
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const CategoryModel = model("Category", categoriesSchema);

module.exports = CategoryModel;
