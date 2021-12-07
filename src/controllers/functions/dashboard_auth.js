const utils = require("../../utils");
const UserInfo = require("../../models/userInfo");
const ChatInfo = require("../../models/chatInfo");
const TrainerInfo = require("../../models/trainerInfo");
const TrainingInfo = require("../../models/trainingInfo");
var validator = require("validator");
const defaultConfig = require("../../config/defaultConfig");
const bcrypt = require("bcryptjs");
const tokenFunction = require("./token");
const { use } = require("../../app");

module.exports = {
  // -------------------------------------  dashboard module  -------------------------------------

  regularUpdate: function (req, res) {
    if (!req.body.waterInfo || !req.body.calInfo) {
      return res.status(400).send(utils.errorMsg(523));
    } else {
      UserInfo.findOne({ _id: req.user._id }, async function (err, usr) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        if (usr == null) {
          return res.status(400).send(utils.errorMsg(err));
        }
        if (new Date(usr.updatedAt).getDate() == new Date().getDate()) {
          usr.waterInfo = usr.waterInfo + req.body.waterInfo;
          usr.calInfo = usr.calInfo + req.body.calInfo;
        } else {
          usr.waterInfo = req.body.waterInfo;
          usr.calInfo = req.body.calInfo;
        }
        usr.save();
        return res.status(201).send(utils.successMsg(undefined, 204));
      });
    }
  },
  userData: function (req, res) {
    UserInfo.findOne({ _id: req.user._id }, async function (err, usr) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }

      return res.status(201).send(utils.successMsg(usr, 204));
    });
  },
  getTrainer: function (req, res) {
    TrainerInfo.find({}, async function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }
      return res.status(201).send(utils.successMsg(data, 201));
    });
  },
  editTrainer: function (req, res) {
    if (req.body.delete) {
      if (!req.body.trainerId) {
        return res.status(400).send(utils.errorMsg(521));
      } else {
        TrainerInfo.findOne({ _id: req.body.trainerId }, function (err, data) {
          if (err) {
            return res.status(400).send(utils.errorMsg(err));
          }
          if (data !== null) {
            data.remove();
          }
          return res.status(201).send(utils.successMsg(undefined, 204));
        });
      }
    } else {
      let trainer = new TrainerInfo(req.body);
      trainer.save();
      return res.status(201).send(utils.successMsg(undefined, 204));
    }
  },
  addTraining: function (req, res) {
    let training = new TrainingInfo(req.body);
    training.save();
    return res.status(201).send(utils.successMsg(undefined, 204));
  },
  getTraining: function (req, res) {
    TrainingInfo.find({}, function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }
      return res.status(201).send(utils.successMsg(data, 204));
    });
  },
  getChats: function (req, res) {
    ChatInfo.find({}, function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }
      return res.status(201).send(utils.successMsg(data, 204));
    });
  },
  editChats: function (req, res) {
    ChatInfo.findOne({ owner: req.body.user_id ? req.body.user_id : req.user._id }, function (err, data) {
      if (err) {
        return res.status(400).send(utils.errorMsg(err));
      }

      if (data == null) {
        let owner = req.body.user_id ? req.body.user_id : req.user._id;
        let chats = [
          {
            user: req.user._id,
            chat: req.body.msg,
          },
        ];
        let chatData = new ChatInfo({ owner, chats });
        chatData.save();
        return res.status(201).send(utils.successMsg(undefined, 201));
      } else {
        let chat = {
          user: req.user._id,
          chat: req.body.msg,
        };
        data.chats = [...data.chats, chat];
        data.save();
      }
      return res.status(201).send(utils.successMsg(undefined, 201));
    });
  },
};
