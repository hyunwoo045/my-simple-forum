const mysql = require("mysql");
const crypto = require("crypto");

const dbconfig = require("../key/dbkey");
const conn = mysql.createConnection(dbconfig);

const User = {
  createHashPassword: (nickname, password) => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, nickname, 110317, 64, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("base64"));
      });
    });
  },
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
  findOneByUsername: (username) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS length FROM user WHERE nickname=?",
        [username],
        (err, result) => {
          if (err) reject(err);
          else {
            if (result[0].length !== 0) reject("DUP_NICKNAME");
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
            if (result[0].length !== 0) reject("DUP_EMAIL");
            else resolve();
          }
        }
      );
    });
  },
  getUserInfo: (email) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
        if (err) reject(err);
        else if (result.length === 0) reject("NOT_FOUND_EMAIL");
        else {
          resolve({
            user_id: result[0].id,
            email: result[0].email,
            nickname: result[0].nickname,
            dbPassword: result[0].password,
            age: result[0].age,
            introduction: result[0].introduction,
          });
        }
      });
    });
  },
};

module.exports = User;
