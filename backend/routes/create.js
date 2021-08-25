var express = require("express");
var mysql = require("mysql");
var router = express.Router();

router.post("/", function (req, res) {
  let mode = req.body.mode;
  let id = String(req.body.id);
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();
  if (mode === "add") {
    connection.query(
      "INSERT INTO contents (title, description, author, created, updated) VALUES(?, ?, ?, NOW(), NOW())",
      [title, description, author],
      (err) => {
        if (err) throw err;
        res.send("INSERTED");
      }
    );
  } else {
    connection.query(
      "UPDATE contents SET title=?, description=?, updated=NOW() WHERE id=?",
      [title, description, id],
      (err) => {
        if (err) throw err;
        res.send("UPDATED");
      }
    );
  }
});

module.exports = router;
