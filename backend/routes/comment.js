var express = require("express");
var mysql = require("mysql");
var router = express.Router();

router.post("/modify", (req, res) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  let id = req.body.id;
  let author = req.body.author;
  let description = req.body.description;

  connection.query(
    "UPDATE comments SET author=?, description=?, updated=NOW() WHERE id=?",
    [author, description, id],
    (err) => {
      if (err) throw err;
      res.send("COMMENT UPDATED");
    }
  );
});

router.post("/delete", (req, res) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  let id = req.body.id;
  connection.query("DELETE FROM comments WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send("COMMENT DELETED");
  });
});

module.exports = router;
