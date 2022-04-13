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
  options: {
    type: Array,
  },
});

const Steps = mongoose.model("Steps", StepSchema);
module.exports = Steps;
