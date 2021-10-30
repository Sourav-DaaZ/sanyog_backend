const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const taskSchema = new mongoose.Schema(
  {
    taskId: { type: Number, default: 0 },
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    project_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    taskAssigned: [
      {
        user: { type: String },
        cost: { type: Number },
      },
    ],
    status: {
      status: { type: String },
      date: { type: String }
    },
    parentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
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

var CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
var counter = mongoose.model("counter", CounterSchema);

taskSchema.pre("save", function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: "entityId" }, { $inc: { seq: 1 } }, function (error, count) {
    if (error) return next(error);
    doc.taskId = count.seq;
    next();
  });
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
