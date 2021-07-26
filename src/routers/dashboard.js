const express = require("express");
const corsOrigin = require("../middleware/cors");
const controllerObj = require("../controllers");
const router = new express.Router();

router.get("/find_user", corsOrigin, async (req, res) => {
  const action = "find_user";
  controllerObj.controller(req, res, action);
});

module.exports = router;
