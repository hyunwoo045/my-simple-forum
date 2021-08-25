var express = require("express");
var mysql = require("mysql");
var router = express.Router();

router.post("/", (req, res) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();
  let author = req.body.author;
  let description = req.body.description;
  let content_id = req.body.content_id;

  connection.query(
    "INSERT INTO comments (author, description, created, updated, content_id) VALUES(?, ?, NOW(), NOW(), ?)",
    [author, description, content_id],
    (err) => {
      if (err) throw err;
      res.send("Comment Added");
    }
  );
});

module.exports = router;
