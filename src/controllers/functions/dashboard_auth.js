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
    Project.find({$or:[{ 'owner': req.user._id },{'projectAssigned.user': req.user._id}]}).populate("task_list").populate("projectAssigned.user")
    .exec(async function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }
      let cost = [];
      let dateExp = [];
      let taskStatus = [];
      let temp = [];
      data.map((x,index)=>(
        cost[index] = 0,
        dateExp[index] = false,
        temp = [],
        x.task_list.map((y, i)=>(
          new Date(y.end_date) < new Date()?dateExp[index] = true:null,
          temp[index]= y.status,
          x.task_list.length == i+1 ?temp.includes('in progress') || temp.includes('complete')?temp.includes('in progress')?taskStatus[index] = 'in progress':taskStatus[index] = 'complete':taskStatus[index] = 'created':null,
          y.taskAssigned.map((z)=>(
            cost[index] = cost[index] + z.cost
          ))
        ))
      ))

      return res.status(200).send(utils.successMsg({data:data, cost:cost, dateExp:dateExp, taskStatus: taskStatus}, 201));
    });
  },

  allTask: function (req, res) {
    Task.find({ $and: [{ project_id: req.query.project_id }, { $or: [{ owner: req.user._id }, { "taskAssigned.user": req.user._id }] }] })
      .populate("project_id")
      .exec(function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        return res.status(200).send(utils.successMsg({data:data,owner: req.user._id}, 201));
      });
  },

  tagTask: function (req, res) {
    UserInfo.findOne({ "_id": req.user._id })
      .populate("tasks")
      .exec(function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        return res.status(200).send(utils.successMsg(data.tasks, 201));
      });
  },
  
  getTaskStatus: function (req, res) {
    Task.findOne({ task_id: req.query.task_id },function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        return res.status(200).send(utils.successMsg( {status:data.status}, 201));
      })
  },

  getAssignedMember: function (req, res) {
    Task.findOne({ _id: req.query.id }).populate("taskAssigned.user")
    .exec(function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        return res.status(200).send(utils.successMsg( data.taskAssigned, 201));
      })
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

                  tsk.taskAssigned = tsk.taskAssigned.filter((obj) => String(obj.user) != String(eml._id));
                  eml.save();
                  tsk.save();
                  return res.status(400).send(utils.successMsg(undefined, 204));
                } else if (req.body.cost) {
                  tsk.taskAssigned.map((x) => (String(x.user) == eml._id ? (x.cost = req.body.cost) : null));
                  tsk.save();
                  return res.status(400).send(utils.successMsg(undefined, 204));
                }
                return res.status(400).send(utils.errorMsg(525));
              } else {
                eml.tasks = req.body.task_id;
                tsk.taskAssigned.push({
                  user: eml._id,
                  ...(req.body.cost && { cost: req.body.cost }),
                });
                tsk.save();
                eml.save();
                return res.status(200).send(utils.successMsg(undefined, 204));
              }
            }
            return res.status(400).send(utils.errorMsg(524));
          });
        }
      }).catch((err) => {
        res.status(500).send(utils.errorMsg(err));
      });
    }
  },

  assignProject: function (req, res) {
    if (!req.body.project_id) {
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
          Project.findOne({ _id: req.body.project_id }, function (er, pjct) {
            if (er) {
              return res.status(400).send(utils.errorMsg(er));
            }

            if (pjct !== null) {
              if (eml.projects && eml.projects.includes(req.body.project_id)) {
                if (req.body.deleteUser) {
                  const ind = eml.projects.indexOf(req.body.project_id);
                  if (ind > -1) {
                    eml.projects.splice(ind, 1);
                  }

                  pjct.projectAssigned = pjct.projectAssigned.filter((obj) => String(obj.user) != String(eml._id));
                  eml.save();
                  pjct.save();
                  return res.status(400).send(utils.successMsg(undefined, 204));
                }
                return res.status(400).send(utils.errorMsg(525));
              } else {
                eml.projects = req.body.project_id;
                pjct.projectAssigned.push({
                  user: eml._id
                });
                pjct.save();
                eml.save();
                return res.status(200).send(utils.successMsg(undefined, 204));
              }
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
      if (req.body.parentTask) {
        Task.findOne({ task_id: req.body.parentTask }, function (err, tsk) {
          if (err) {
            return res.status(400).send(utils.errorMsg(err));
          } else if (tsk === null) {
            return res.status(400).send(utils.errorMsg(524));
          } else {
            let taskData = new Task(req.body);
            taskData.parentTask = req.body.parentTask;
            taskData.owner = req.user._id;
            taskData
              .save()
              .then((x) => {
                Project.findOne({ _id: req.body.project_id }, function (er, pjct) {
                  if (er) {
                    return res.status(400).send(utils.errorMsg(er));
                  } else if (pjct === null) {
                    return res.status(400).send(utils.errorMsg(524));
                  }
                  pjct.task_list.push(x._id);
                  pjct.save();
        
                })
                return res.status(200).send(utils.successMsg(undefined, 204));
              })
              .catch((err) => {
                return res.status(400).send(utils.errorMsg(err));
              });
          }
        });
      } else {
        let taskData = new Task(req.body);
        taskData.owner = req.user._id;
        taskData
          .save()
          .then((x) => {
            Project.findOne({ _id: req.body.project_id }, function (er, pjct) {
              if (er) {
                return res.status(400).send(utils.errorMsg(er));
              } else if (pjct === null) {
                return res.status(400).send(utils.errorMsg(524));
              }
              pjct.task_list.push(x._id);
              pjct.save();
    
            })
            return res.status(200).send(utils.successMsg(undefined, 204));
          })
          .catch((err) => {
            return res.status(400).send(utils.errorMsg(err));
          });
      }
    }
  },

  editTask: function (req, res) {
    if (!req.body.task_id) {
      return res.status(400).send(utils.errorMsg(523));
    } else {
      Task.findOne({ _id: req.body.task_id }, function (err, tsk) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        } else if (tsk === null) {
          return res.status(400).send(utils.errorMsg(524));
        } else {
          if (String(tsk.owner) == req.user._id) {
            if (req.body.name) {
              tsk.name = req.body.name;
            }
            if (req.body.details) {
              tsk.details = req.body.details;
            }
            if (req.body.start_date) {
              tsk.start_date = req.body.start_date;
            }
            if (req.body.end_date) {
              tsk.end_date = req.body.end_date;
            }
            if (req.body.status) {
              tsk.status = req.body.status;
            }
            if (req.body.parentTask) {
              Task.findOne({ task_id: req.body.parentTask }, function (er, ts) {
                
                if (er) {
                  return res.status(400).send(utils.errorMsg(err));
                } else if (ts === null) {
                  return res.status(400).send(utils.errorMsg(524));
                } else {
                  tsk.parentTask = req.body.parentTask;
                  tsk.save();
                  return res.status(200).send(utils.successMsg(undefined, 204));
                }
              });
            }else{
              tsk.save();
              return res.status(200).send(utils.successMsg(undefined, 204));
            }
            
          } else {
            if (req.body.status) {
              tsk.status = req.body.status;
            }
            if (req.body.time) {
              tsk.taskAssigned.map((x) => (String(x.user) == req.user._id ? (x.time = Number(x.time) + Number(req.body.time)) : null));
            }
            tsk.save();
            return res.status(200).send(utils.successMsg(undefined, 204));
          }
        }
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
