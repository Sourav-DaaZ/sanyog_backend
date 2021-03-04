const express = require("express");
const corsOrigin = require("../middleware/cors");
const controllerObj = require("../controllers");
const router = new express.Router();

router.post("/test", corsOrigin, async (req, res) => {
  const action = "check_user_availability";
  controllerObj.controller(req, res, action);
});

module.exports = router;
