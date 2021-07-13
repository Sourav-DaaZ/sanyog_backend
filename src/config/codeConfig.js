const errorCode = {
  501: "user is not authorized to perform this action",
  502: "Not allowed by CORS",
  503: "Url not found",
  504: "password must contain digit",
  505: "email_id is required",
  506: "please enter correct email_id",
  507: "Otp is requred!",
  508: "Please Resend the OTP",
  509: "Please enter currect OTP",
  510: "email / user name is already exist",
  511: "email doesn't exist",
  512: "please enter correct password",
  513: "Please enter any one data",
  514: "Need to enter any one secrect key",
  515: "Device id is required",
  516: "Refresh token is required",
  517: "Internal server error",
  518: "Not Available",
  519: "User_name required",
};
const successCode = {
  201: "Data return seccessfully",
  202: "OTP Sent seccessfully",
  203: "Available",
};

module.exports = { errorCode, successCode };
