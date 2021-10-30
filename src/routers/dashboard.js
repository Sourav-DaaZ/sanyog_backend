const express = require("express");
const corsOrigin = require("../middleware/cors");
const auth = require("../middleware/auth");
const controllerObj = require("../controllers");
const router = new express.Router();

router.post("/create_project", auth, async (req, res) => {
  const action = "create_project";
  controllerObj.controller(req, res, action);
});

router.get("/all_project", auth, async (req, res) => {
  const action = "all_project";
  controllerObj.controller(req, res, action);
});

module.exports = router;
