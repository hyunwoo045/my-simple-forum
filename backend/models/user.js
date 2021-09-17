const mysql = require("mysql");
// const crypto = require("crypto");
const dbconfig = require("../key/config").database;
const conn = mysql.createConnection(dbconfig);

const User = {
  find: (provider, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT id FROM user WHERE provider=? AND identifier=?",
        [provider, id],
        (err, res) => {
          if (err) reject(err);
          if (res[0] === undefined) {
            resolve(false);
          } else {
            resolve(res[0].id);
          }
        }
      );
    });
  },
  create: (provider, id, displayName) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO user(provider, identifier, nickname) VALUES (?, ?, ?)",
        [provider, id, displayName],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};

module.exports = User;

/* OLD VERSION */

// createHashPassword: (nickname, password) => {
//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(password, nickname, 110317, 64, "sha512", (err, key) => {
//       if (err) reject(err);
//       resolve(key.toString("base64"));
//     });
//   });
// },
