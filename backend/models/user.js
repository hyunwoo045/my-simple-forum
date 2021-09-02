const mysql = require("mysql");
const dbconfig = require("../key/dbkey");
const conn = mysql.createConnection(dbconfig);

const User = {
  create: (email, username, password) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO user (email, nickname, password) VALUES (?, ?, ?);",
        [email, username, password],
        (err) => {
          if (err) reject(err);
          else {
            resolve();
          }
        }
      );
    });
  },
  verify: (email, password) => {
    return new Promise(function (resolve, reject) {
      conn.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
        if (err) reject(err);
        else {
          if (result[0].password === password)
            resolve({
              user_id: result[0].id,
              email: result[0].email,
              nickname: result[0].nickname,
              age: result[0].age,
              introduction: result[0].introduction,
            });
          else reject("NOT_VALID_PASSWORD");
        }
      });
    });
  },
  findOneByUsername: (username) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS length FROM user WHERE nickname=?",
        [username],
        (err, result) => {
          if (err) reject(err);
          else {
            if (result[0].length !== 0) resolve(true);
            else resolve(false);
          }
        }
      );
    });
  },
  findOneByEmail: (email) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS length FROM user WHERE email=?",
        [email],
        (err, result) => {
          if (err) reject(err);
          else {
            if (result[0].length !== 0) resolve(true);
            else resolve(false);
          }
        }
      );
    });
  },
};

module.exports = User;
