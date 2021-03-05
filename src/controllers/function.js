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
};
