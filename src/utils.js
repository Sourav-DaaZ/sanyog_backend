const { errorCode, successCode } = require("./config/codeConfig");

module.exports = {
  errorMsg: function (code) {
    console.log(errorCode[code])
    if (errorCode[code] !== undefined) {
      return {
        error_code: code,
        message: errorCode[code],
      };
    } else {
      return {
        message: code,
      };
    }
  },

  successMsg: function (data, code) {
    if (successCode[code] !== undefined) {
      if (data !== undefined) {
        return {
          data: data,
          success_code: code,
          message: successCode[code],
        };
      } else {
        return {
          success_code: code,
          message: successCode[code],
        };
      }
    } else {
      if (data !== undefined) {
        return {
          data: data,
          message: code,
        };
      } else {
        return {
          message: code,
        };
      }
    }
  },
};
