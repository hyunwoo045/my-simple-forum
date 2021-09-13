const jwt = require("jsonwebtoken");
const jwtSecret = require("../key/config").jwt;
const secret = jwtSecret.secret;
const accessOption = jwtSecret.accessOption;
const refreshOption = jwtSecret.refreshOption;

const JWTController = {
  accessGenerate: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, accessOption, (err, token) => {
        if (err) reject("FAILED_AT_GENERATE");
        resolve(token);
      });
    });
  },
  accessVerify: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) reject("NEED_LOGIN");
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject("NOT_VALID_ACCESS_TOKEN");
        resolve(decoded);
      });
    });
  },
  refreshGenerate: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, refreshOption, (err, token) => {
        if (err) reject("FAILED_RT_GENERATE");
        resolve(token);
      });
    });
  },
  refreshVerify: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) reject("NEED_LOGIN");
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject("NOT_VALID_REFRESH_TOKEN");
        resolve(decoded);
      });
    });
  },
};

module.exports = JWTController;
