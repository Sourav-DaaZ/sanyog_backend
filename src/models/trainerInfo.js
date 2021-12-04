const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
    },
    price: {
      type: Number,
    },
    callInfo: {
      type: String,
    },
  },
  { timestamps: true }
);
const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
