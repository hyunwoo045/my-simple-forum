const jwt = require("jsonwebtoken");
const accessKey = require("../key/secretKey");

const accessSecert = accessKey.secret;
const accessOption = accessKey.option;
// const { refreshSecret, refreshOption } = refreshKey;

const JWTController = {
  accessGenerate: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, accessSecert, accessOption, (err, token) => {
        console.log(token);
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  accessVerify: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) reject("NEED_LOGIN");
      jwt.verify(token, accessSecert, (err, decoded) => {
        if (err) reject("NOT_VALID_ACCESS_TOKEN");
        resolve(decoded);
      });
    });
  },
};

module.exports = JWTController;
