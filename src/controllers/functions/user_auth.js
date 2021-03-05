const utils = require("../../utils");
const UserInfo = require("../../models/userInfo");
var validator = require("validator");
const OtpData = require("../../models/regOtp");
const defaultConfig = require("../../config/defaultConfig");
const { sendWelcomeEmail, sendOtpInMail } = require("./../../emails/account");
const bcrypt = require("bcryptjs");

module.exports = {
  // -------------------------------------  otp sent  -------------------------------------

  emailVerification: function (req, res) {
    if (!req.body.email) {
      return res.status(400).send(utils.errorMsg(505));
    } else if (!validator.isEmail(req.body.email)) {
      return res.status(400).send(utils.errorMsg(506));
    } else {
      OtpData.findOne({ email: req.body.email }, async function (err, eml) {
        if (err) {
          return res.status(400).send(utils.errorMsg(err));
        }
        // if email is not register in otp table
        if (eml !== null) {
          // sendOtpInMail(eml.email, eml.otp);
          return res.status(200).send(utils.successMsg(undefined, 202));
        }
        // random otp genarate
        var otp_var = Math.floor(1000 + Math.random() * 9000);
        let user_otp = {
          email: req.body.email,
          otp: otp_var,
        };
        console.log(user_otp);

        const otp_model = await new OtpData(user_otp);
        await otp_model.save();
        // await sendOtpInMail(user_otp.email, user_otp.otp);

        return await res.status(200).send(utils.successMsg(undefined, 202));
      }).catch((err) => {
        res.status(500).send(utils.errorMsg(err));
      });
    }
  },

  // -------------------------------------  register user  -------------------------------------

  registerUser: function (req, res) {
    if (!req.body.otp) {
      return res.status(404).send(utils.errorMsg(507));
    }
    OtpData.findOne({ email: req.body.email }, async function (err, eml) {
      if (err) {
        return res.send(400).send(utils.errorMsg(err));
      }
      if (eml === null) {
        return res.status(404).send(utils.errorMsg(508));
      }
      if (eml.otp !== req.body.otp) {
        return res.status(400).send(utils.errorMsg(509));
      }
      await UserInfo.findOne({ email: req.body.email }, async function (error, usr) {
        if (error) {
          return res.send(400).send(err);
        }
        if (usr !== null) {
          return res.status(310).send(utils.errorMsg(510));
        }
        let user = new UserInfo(req.body);
        await bcrypt.hash(req.body.password, defaultConfig[defaultConfig.env].saltRound, async function (e, hash) {
          if (e) {
            return res.send(400).send(utils.errorMsg(e));
          }
          user.password = hash;
          await user.save();
          // await sendWelcomeEmail(user.email , user.name);
          await res.status(201).send(utils.successMsg(user, 201));
        });
      }).catch((e) => {
        res.status(500).send(utils.errorMsg(e));
      });
    }).catch((err) => {
      res.status(500).send(utils.errorMsg(err));
    });
  },

  // -------------------------------------  login user  -------------------------------------

  loginUser: function (req, res) {
    if (!req.body.otp && req.body.password) {
      UserInfo.findOne({ email: req.body.email }, async function (error, user) {
        if (error) {
          return res.send(400).send(utils.errorMsg(error));
        }
        if (user === null) {
          return res.status(404).send(utils.errorMsg(511));
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
          return res.status(400).send(utils.errorMsg(512));
        }
        return res.status(201).send(utils.successMsg(user, 201));
      }).catch((err) => {
        return res.status(500).send(utils.errorMsg(err));
      });
    } else if (req.body.otp && !req.body.password) {
      OtpData.findOne({ email: req.body.email }, async function (err, eml) {
        if (err) {
          return res.send(400).send(utils.errorMsg(err));
        }
        if (eml === null) {
          return res.status(404).send(utils.errorMsg(508));
        }
        if (eml.otp !== req.body.otp) {
          return res.status(400).send(utils.errorMsg(509));
        }
        await UserInfo.findOne({ email: req.body.email }, async function (e, usr) {
          if (e) {
            return res.send(400).send(utils.errorMsg(e));
          }
          if (usr === null) {
            return res.status(400).send(utils.errorMsg(511));
          }
          return res.status(201).send(utils.successMsg(usr, 201));
        }).catch((e) => {
          return res.status(500).send(utils.errorMsg(e));
        });
      }).catch((err) => {
        return res.status(500).send(utils.errorMsg(err));
      });
    } else if (req.body.otp && req.body.password) {
      return res.status(404).send(utils.errorMsg(513));
    } else if (!req.body.otp && !req.body.password) {
      return res.status(404).send(utils.errorMsg(514));
    }
  },
};
