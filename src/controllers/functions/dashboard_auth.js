const utils = require("../../utils");
const UserInfo = require("../../models/userInfo");
var validator = require("validator");
const defaultConfig = require("../../config/defaultConfig");
const bcrypt = require("bcryptjs");
const tokenFunction = require("./token");

module.exports = {
  // -------------------------------------  dashboard module  -------------------------------------

  searchUser: function (req, res) {
    if (!req.body.user_name) {
      return res.status(400).send(utils.errorMsg(505));
    } else {
      UserInfo.findOne({ user_name: req.body.user_name }, async function (err, data) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        if (data !== null) {
          let val = {
            name: data.name,
            email: data.email,
            images: data.images,
            id: data._id,
          };
          return res.status(200).send(utils.successMsg(val, 202));
        }
        return res.status(200).send(utils.errorMsg(520));
      }).catch((err) => {
        res.status(500).send(utils.errorMsg(err));
      });
    }
  },
};
