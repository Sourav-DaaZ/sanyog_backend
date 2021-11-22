const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 7,
      trim: true,
    },
    type: {
      type: String,
      default: "user",
      trim: true,
    },
    jobTitle: {
      type: String,
      trim: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    images: Array,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
