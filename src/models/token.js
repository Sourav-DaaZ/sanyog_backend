const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  tokens: [
    {
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
