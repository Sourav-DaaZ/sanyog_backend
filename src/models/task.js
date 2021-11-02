const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema(
  {
    task_id: {
      type: Number
    },
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    taskAssigned: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        time: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
      },
    ],
    status: { type: String, default: 'created' },
    parentTask: {
      type: Number
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
  },
  { timestamps: true }
);

taskSchema.plugin(AutoIncrement, {inc_field: 'task_id'});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
