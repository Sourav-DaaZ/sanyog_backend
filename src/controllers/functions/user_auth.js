const coreControler = require("./controllerCore");

module.exports = {
  checkUserAvailability: function (req, res) {
    return res.status(200).send(coreControler.utils.successMsg("hii", 201));
  },
};
