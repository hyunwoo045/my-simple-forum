const mysql = require("mysql");
const crypto = require("crypto");

const dbconfig = require("../key/dbkey");
const conn = mysql.createConnection(dbconfig);

const User = {
  find: (provider, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT id FROM user_test WHERE provider=? AND identifier=?",
        [provider, id],
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          if (res.length === 0) {
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
        "INSERT INTO user_test(provider, identifier, nickname) VALUES (?, ?, ?)",
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

// create: (email, nickname) => {
//   return new Promise((resolve, reject) => {
//     conn.query(
//       "INSERT INTO user (email, nickname) VALUES (?, ?);",
//       [email, nickname],
//       (err) => {
//         if (err) reject(err);
//         else {
//           resolve();
//         }
//       }
//     );
//   });
// },

// findOneByUsername: (username) => {
//   return new Promise((resolve, reject) => {
//     conn.query(
//       "SELECT COUNT(*) AS length FROM user WHERE nickname=?",
//       [username],
//       (err, result) => {
//         if (err) reject(err);
//         else {
//           if (result[0].length !== 0) reject("DUP_NICKNAME");
//           else resolve(false);
//         }
//       }
//     );
//   });
// },

// findOneByEmail: (email) => {
//   return new Promise((resolve, reject) => {
//     conn.query(
//       "SELECT COUNT(*) AS length FROM user WHERE email=?",
//       [email],
//       (err, result) => {
//         if (err) reject(err);
//         else {
//           if (result[0].length !== 0) reject("DUP_EMAIL");
//           else resolve();
//         }
//       }
//     );
//   });
// },

// getUserInfo: (email) => {
//   return new Promise((resolve, reject) => {
//     conn.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
//       if (err) reject(err);
//       else if (result.length === 0) reject("NOT_FOUND_EMAIL");
//       else {
//         resolve({
//           id: result[0].id,
//           nickname: result[0].nickname,
//           // dbPassword: result[0].password,
//         });
//       }
//     });
//   });
// },
