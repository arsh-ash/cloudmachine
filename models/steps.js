const mongoose = require("mongoose");

let StepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  Machine: {
    type: mongoose.Schema.ObjectId,
    ref: "Machine",
  },
  answer: {
    type: String,
    select: false,
  },
  answerType: {
    type: String,
    enum: ["mcq", "sentence"],
    default: "sentence",
  },
  options: {
    type: Array,
  },
  // optionsAns: {
  //   type: Array,
  // },
  optionsAns: {
    type: String,
  },
});

const Steps = mongoose.model("Steps", StepSchema);
module.exports = Steps;
