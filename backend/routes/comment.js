let express = require("express");
let mysql = require("mysql");
var url = require("url");
let router = express.Router();
let dbkey = require("../key/dbkey");

const dbConfig = new dbkey().config;

/* READ COMMENTS BY CONTENT ID */
/* /api/comment?id=[] */
router.get("/", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
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

/* CREATE COMMENT */
/* /api/comment/add */
router.post("/create", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
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

/* UPDATE COMMENT */
/* /api/comment/modify */
router.post("/modify", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
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

/* DETELTE COMMENT */
/* /api/comment/delete */
router.post("/delete", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  let id = req.body.id;
  connection.query("DELETE FROM comments WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send("COMMENT DELETED");
  });
});

module.exports = router;
