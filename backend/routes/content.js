let express = require("express");
let mysql = require("mysql");
var url = require("url");
let router = express.Router();
let dbkey = require("../key/dbkey");

const dbConfig = new dbkey().config;

/* READ CONTENTS */
/* /api/content | /api/content?id=[] */
router.get("/", (req, res) => {
  var connection = mysql.createConnection(dbConfig);
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

/* CREATE CONTENT */
/* /api/content/create */
router.post("/create", function (req, res) {
  let id = String(req.body.id);
  let author = req.body.author;
  let title = req.body.title;
  let description = req.body.description;

  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  connection.query(
    "INSERT INTO contents (title, description, author, created, updated) VALUES(?, ?, ?, NOW(), NOW())",
    [title, description, author],
    (err) => {
      if (err) throw err;
      res.send("INSERTED");
    }
  );
});

/* UPDATE CONTENT */
/* /api/content/modify */
router.post("/modify", function (req, res) {
  let id = String(req.body.id);
  let author = req.body.author;
  let title = req.body.title;
  let description = req.body.description;

  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  connection.query(
    "UPDATE contents SET title=?, description=?, updated=NOW() WHERE id=?",
    [title, description, id],
    (err) => {
      if (err) throw err;
      res.send("UPDATED");
    }
  );
});

/* DELETE CONTENT */
/* /api/content/delete */
router.post("/delete", function (req, res) {
  let id = req.body.id;
  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  connection.query(`DELETE FROM contents WHERE id=?`, [id], (err) => {
    if (err) throw err;
    res.send("Delete Completed");
  });
});

module.exports = router;
