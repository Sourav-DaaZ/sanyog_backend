const utils = require("../../utils");
const UserInfo = require("../../models/userInfo");
const Project = require("../../models/project");
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
      return res.status(200).send(utils.successMsg(data,204));
    })
  },
  
  createProject: function (req, res) {
    if (!req.body.name) {
      return res.status(400).send(utils.errorMsg(505));
    } else {
      let project = new Project(req.body);
      project.owner = req.user._id;
        project.save().then(()=>{
          return res.status(200).send(utils.successMsg(undefined,204));
        }).catch((err)=>{
          return res.status(400).send(utils.errorMsg(err));
        });
    }
  },
};
