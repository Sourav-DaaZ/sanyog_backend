const utils = require("../../utils");
const UserInfo = require("../../models/userInfo");
const Project = require("../../models/project");
const Task = require("../../models/task");
var validator = require("validator");
const defaultConfig = require("../../config/defaultConfig");
const bcrypt = require("bcryptjs");
const tokenFunction = require("./token");

module.exports = {
  // -------------------------------------  dashboard module  -------------------------------------

  allProject: function (req, res) {
    Project.find({ owner: req.user._id }, async function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }
      return res.status(200).send(utils.successMsg(data, 201));
    });
  },

  allTask: function (req, res) {
    Task.find({ $or: [{ owner: req.user._id }, { "taskAssigned.user": req.user._id }] })
      .populate("project_id")
      .exec(function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        console.log(data);
        return res.status(200).send(utils.successMsg(data, 201));
      });
  },

  assignTask: function (req, res) {
    if (!req.body.task_id) {
      return res.status(400).send(utils.errorMsg(523));
    } else if (!req.body.email) {
      return res.status(400).send(utils.errorMsg(505));
    } else {
      UserInfo.findOne({ email: req.body.email }, function (err, eml) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        } else if (eml === null) {
          return res.status(400).send(utils.errorMsg(511));
        } else {
          Task.findOne({ _id: req.body.task_id }, function (er, tsk) {
            if (er) {
              return res.status(400).send(utils.errorMsg(er));
            }
            if (tsk !== null) {
              if (eml.tasks && eml.tasks.includes(req.body.task_id)) {
                if (req.body.deleteUser) {
                  const ind = eml.tasks.indexOf(req.body.task_id);
                  if (ind > -1) {
                    eml.tasks.splice(ind, 1);
                  }
                  tsk.taskAssigned = tsk.taskAssigned.filter((obj) => obj.user === eml._id);
                  eml.save();
                  tsk.save();
                  return res.status(400).send(utils.successMsg(undefined, 204));
                } else if (req.body.cost) {
                  tsk.taskAssigned.map((x) => (String(x.user) == eml._id ? (x.cost = req.body.cost) : null));
                  tsk.save();
                  return res.status(400).send(utils.successMsg(undefined, 204));
                }
                return res.status(400).send(utils.errorMsg(525));
              }
              eml.tasks = req.body.task_id;
              let assignedTask = {
                user: eml._id,
                ...(req.body.cost && { cost: req.body.cost }),
              };
              tsk.taskAssigned.push(assignedTask);
              eml.save();
              tsk.save();
              return res.status(200).send(utils.successMsg(undefined, 204));
            }
            return res.status(400).send(utils.errorMsg(524));
          });
        }
      }).catch((err) => {
        res.status(500).send(utils.errorMsg(err));
      });
    }
  },

  createTask: function (req, res) {
    if (!req.body.project_id) {
      return res.status(400).send(utils.errorMsg(521));
    } else if (!req.body.name) {
      return res.status(400).send(utils.errorMsg(520));
    } else if (!req.body.start_date || !req.body.end_date) {
      return res.status(400).send(utils.errorMsg(522));
    } else {
      let taskData = new Task(req.body);
      if (req.body.parentTask) {
        Task.findOne({ task_id: req.body.parentTask }, function (err, tsk) {
          if (err) {
            return res.status(400).send(utils.errorMsg(err));
          } else if (tsk === null) {
            return res.status(400).send(utils.errorMsg(524));
          } else {
            taskData.parentTask = req.body.parentTask;
          }
        });
      }
      taskData.owner = req.user._id;
      taskData
        .save()
        .then(() => {
          return res.status(200).send(utils.successMsg(undefined, 204));
        })
        .catch((err) => {
          return res.status(400).send(utils.errorMsg(err));
        });
    }
  },

  createProject: function (req, res) {
    if (!req.body.name) {
      return res.status(400).send(utils.errorMsg(505));
    } else {
      let project = new Project(req.body);
      project.owner = req.user._id;
      project
        .save()
        .then(() => {
          return res.status(200).send(utils.successMsg(undefined, 204));
        })
        .catch((err) => {
          return res.status(400).send(utils.errorMsg(err));
        });
    }
  },
};
