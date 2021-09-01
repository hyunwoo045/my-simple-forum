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
    "SELECT comments.id, user_id, users.nickname AS author, description, created, updated FROM comments LEFT JOIN users ON user_id=users.id WHERE content_id=?",
    [id],
    (err, comments) => {
      if (err) throw err;
      connection.end();
      res.send(comments);
    }
  );
});

/* CREATE COMMENT */
/* /api/comment/add */
router.post("/create", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
  connection.connect();
  let user_id = req.body.user_id;
  let description = req.body.description;
  let content_id = req.body.content_id;

  connection.query(
    "INSERT INTO comments (user_id, description, created, updated, content_id) VALUES(?, ?, NOW(), NOW(), ?)",
    [user_id, description, content_id],
    (err) => {
      if (err) throw err;
      connection.end();
      res.send("Comment Added");
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
    connection.end();
    res.send("COMMENT DELETED");
  });
});

module.exports = router;
