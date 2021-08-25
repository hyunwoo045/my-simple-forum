var express = require("express");
var mysql = require("mysql");
var url = require("url");
var router = express.Router();

router.get("/", (req, res) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let id = queryData.id;
  let _query = "";
  if (id === undefined) {
    _query = "SELECT * FROM contents";
    connection.query(_query, (err, topics) => {
      if (err) throw err;
      res.send(topics);
    });
  } else {
    connection.query(
      "SELECT * FROM contents WHERE id=?",
      [id],
      (err, topics) => {
        if (err) throw err;
        res.send(topics);
      }
    );
  }
});

module.exports = router;
