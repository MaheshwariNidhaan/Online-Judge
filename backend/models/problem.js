const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  sampleInput1: {
    type: String,
    required: true,
  },
  sampleOutput1: {
    type: String,
    required: true,
  },
  sampleInput2: {
    type: String,
    required: true,
  },
  sampleOutput2: {
    type: String,
    required: true,
  },
  hiddenTestCases: {
    type: [{ input: String, output: String }],
    default: [],
  },
});

module.exports = mongoose.model("Problem", problemSchema);
