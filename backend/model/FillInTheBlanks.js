const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FillInTheBlankSchema = new Schema({
  text: {
    type: String,
    required: true, // The full text with gaps, e.g., "<p>writing ____ and ____.</p>"
  },
  blanks: [
    {
      position: {
        type: Number,
        required: true, // Index of the blank (e.g., 0 for the first blank)
      },
      correctAnswer: {
        type: String,
        required: true, // The correct answer for the blank
      },
      options: {
        type: [String], // Array of options for this blank
      },
    },
  ],
});

const FillTheBlankModel =  mongoose.model("FillInTheBlank", FillInTheBlankSchema);

module.exports = FillTheBlankModel;