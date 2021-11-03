module.exports = {
  register_user: {
    controller: "user_auth",
    function: "registerUser",
  },
  email_verification: {
    controller: "user_auth",
    function: "emailVerification",
  },
  login_user: {
    controller: "user_auth",
    function: "loginUser",
  },
  refresh_token: {
    controller: "token",
    function: "refreshToken",
  },
  verify_username: {
    controller: "user_auth",
    function: "userNameVerification",
  },
  create_project: {
    controller: "dashboard_auth",
    function: "createProject",
  },
  all_project: {
    controller: "dashboard_auth",
    function: "allProject",
  },
  create_task: {
    controller: "dashboard_auth",
    function: "createTask",
  },
  assign_task: {
    controller: "dashboard_auth",
    function: "assignTask",
  },
  all_task: {
    controller: "dashboard_auth",
    function: "allTask",
  },
  edit_task: {
    controller: "dashboard_auth",
    function: "editTask",
  },
  get_task_status: {
    controller: "dashboard_auth",
    function: "getTaskStatus",
  },
  get_assigned_member: {
    controller: "dashboard_auth",
    function: "getAssignedMember",
  },
  get_tag_task: {
    controller: "dashboard_auth",
    function: "tagTask",
  },
};
