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
  regular_update: {
    controller: "dashboard_auth",
    function: "regularUpdate",
  },
  get_trainer: {
    controller: "dashboard_auth",
    function: "getTrainer",
  },
  edit_trainer: {
    controller: "dashboard_auth",
    function: "editTrainer",
  },
  add_training: {
    controller: "dashboard_auth",
    function: "addTraining",
  },
  get_training: {
    controller: "dashboard_auth",
    function: "getTraining",
  },
  get_chats: {
    controller: "dashboard_auth",
    function: "getChats",
  },
  edit_chats: {
    controller: "dashboard_auth",
    function: "editChats",
  },
};
