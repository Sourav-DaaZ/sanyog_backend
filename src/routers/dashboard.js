const express = require("express");
const corsOrigin = require("../middleware/cors");
const auth = require("../middleware/auth");
const controllerObj = require("../controllers");
const router = new express.Router();

router.post("/regular_update", auth, async (req, res) => {
  const action = "regular_update";
  controllerObj.controller(req, res, action);
});

router.get("/get_trainer", auth, async (req, res) => {
  const action = "get_trainer";
  controllerObj.controller(req, res, action);
});

router.post("/edit_trainer", auth, async (req, res) => {
  const action = "edit_trainer";
  controllerObj.controller(req, res, action);
});

router.post("/add_training", auth, async (req, res) => {
  const action = "add_training";
  controllerObj.controller(req, res, action);
});

router.get("/get_training", auth, async (req, res) => {
  const action = "get_training";
  controllerObj.controller(req, res, action);
});
router.get("/get_chats", auth, async (req, res) => {
  const action = "get_chats";
  controllerObj.controller(req, res, action);
});
router.post("/edit_chats", auth, async (req, res) => {
  const action = "edit_chats";
  controllerObj.controller(req, res, action);
});
router.get("/user_data", auth, async (req, res) => {
  const action = "user_data";
  controllerObj.controller(req, res, action);
});

module.exports = router;
