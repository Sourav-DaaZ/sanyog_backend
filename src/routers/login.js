const express = require("express");
const corsOrigin = require("../middleware/cors");
const controllerObj = require("../controllers");
const router = new express.Router();

router.post("/email_varification", corsOrigin, async (req, res) => {
  const action = "email_verification";
  controllerObj.controller(req, res, action);
});

router.post("/register_user", corsOrigin, async (req, res) => {
  const action = "register_user";
  controllerObj.controller(req, res, action);
});

router.get("/login", corsOrigin, async (req, res) => {
  const action = "login_user";
  controllerObj.controller(req, res, action);
});

module.exports = router;
