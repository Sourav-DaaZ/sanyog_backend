const mongoose = require("mongoose");
const timeStamp = require("../utils/timeStamp.js");

var timeStampData = timeStamp;

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  tokens: [
    {
      type: Array,
      access_token: {
        type: String,
        required: true,
      },
      refresh_token: {
        type: String,
        required: true,
      },
    },
  ],
  device_id: {
    type: String,
  },
});

module.exports = mongoose.model("token", tokenSchema);
