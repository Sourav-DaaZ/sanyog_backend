const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const chatSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
    },
    chats: [{
      user: {type: String},
      chat: {type: String}
    }]
  }
);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
