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

  connection.query(
    "SELECT * FROM comments WHERE content_id=?",
    [id],
    (err, comments) => {
      if (err) throw err;
      res.send(comments);
    }
  );
});

module.exports = router;
