const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const comprehensionSchema = new mongoose.Schema({
  passage: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Comprehension = mongoose.model("Comprehension", comprehensionSchema);

module.exports = Comprehension;
