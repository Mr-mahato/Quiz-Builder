const mongoose = require('mongoose');

const fillInTheBlanksSchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true,
  },
  blankText: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
});

const FillInTheBlanks = mongoose.model('FillInTheBlanks', fillInTheBlanksSchema);

module.exports = FillInTheBlanks;