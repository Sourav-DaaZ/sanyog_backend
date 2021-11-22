const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
    },
    details: {
      type: String,
      trim: true,
    },
    owner: {
      type: String,
      require: true
    },
    projectAssigned: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      },
    ],
    task_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
