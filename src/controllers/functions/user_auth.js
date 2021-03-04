const utils = require("../../utils");

module.exports = {
  checkUserAvailability: function (req, res) {
    return res.status(200).send(utils.successMsg("hii", 201));
  },
};
