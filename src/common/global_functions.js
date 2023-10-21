const jwt = require("jsonwebtoken");

function resSuccess(code, result_type, data) {
  return {
    status: "success",
    code: code,
    result_type: result_type,
    result: data,
  };
}

function resFailure(code, errMsg) {
  return {
    status: "failure",
    code: code,
    error: errMsg,
  };
}

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_PRIVATE_KEY);
}

module.exports = { resSuccess, resFailure, generateToken };
