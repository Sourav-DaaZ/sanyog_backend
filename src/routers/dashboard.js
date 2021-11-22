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

router.post("/create_task", auth, async (req, res) => {
  const action = "create_task";
  controllerObj.controller(req, res, action);
});

router.get("/all_task", auth, async (req, res) => {
  const action = "all_task";
  controllerObj.controller(req, res, action);
});

router.post("/assign_task", auth, async (req, res) => {
  const action = "assign_task";
  controllerObj.controller(req, res, action);
});
router.post("/assign_project", auth, async (req, res) => {
  const action = "assign_project";
  controllerObj.controller(req, res, action);
});

router.patch("/edit_task", auth, async (req, res) => {
  const action = "edit_task";
  controllerObj.controller(req, res, action);
});

router.get("/get_task_status", auth, async (req, res) => {
  const action = "get_task_status";
  controllerObj.controller(req, res, action);
});

router.get("/get_assigned_members", auth, async (req, res) => {
  const action = "get_assigned_member";
  controllerObj.controller(req, res, action);
});

router.get("/get_tag_task", auth, async (req, res) => {
  const action = "get_tag_task";
  controllerObj.controller(req, res, action);
});

module.exports = router;
