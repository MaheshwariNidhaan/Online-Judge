const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  output: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
