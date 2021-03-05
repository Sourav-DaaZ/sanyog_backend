const jwt = require("jsonwebtoken");
// const User = require('../models/user');
const { errorMsg } = require("../utils");
if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send(errorMsg(501));
  }
};

module.exports = auth;
