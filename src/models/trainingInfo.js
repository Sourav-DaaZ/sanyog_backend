const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const TrainingInfoSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
  }
);
const TrainingInfo = mongoose.model("Traing", TrainingInfoSchema);

module.exports = TrainingInfo;
