let express = require("express");
let mysql = require("mysql");
let router = express.Router();
let dbkey = require("../key/dbkey");

const dbConfig = new dbkey().config;

router.post("/", (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const email = req.body.inputs.email;
  const nickname = req.body.inputs.nickname;
  const password = req.body.inputs.password;
  connection.query(
    "INSERT INTO users (email, nickname, password) VALUES (?, ?, ?);",
    [email, nickname, password],
    (err) => {
      if (err) {
        connection.end();
        res.send(err);
      } else {
        connection.end();
        res.send({ code: "OK" });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, userInfo) => {
      if (err) throw err;
      res.send(userInfo);
    }
  );
});

module.exports = router;
