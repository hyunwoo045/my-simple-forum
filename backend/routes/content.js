let express = require("express");
let mysql = require("mysql");
var url = require("url");
let router = express.Router();
let dbconfig = require("../key/dbkey");

/* READ CONTENTS */
/* /api/content | /api/content?id=[] */
router.get("/", (req, res) => {
  let connection = mysql.createConnection(dbconfig);
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let id = queryData.id;
  if (id === undefined) {
    connection.query(
      "SELECT contents.id, user_id, user.nickname AS author, title, description, created, updated FROM contents LEFT JOIN user ON user_id = user.id ORDER BY created DESC LIMIT 0, 10;",
      (err, topics) => {
        if (err) throw err;
        connection.query(
          "SELECT COUNT(*) AS length FROM contents",
          (err, contentCnt) => {
            connection.end();
            res.send({
              length: contentCnt[0].length,
              topics,
            });
          }
        );
        // connection.end();
        // res.send(topics);
      }
    );
  } else {
    connection.query(
      "SELECT contents.id, user_id, user.nickname AS author, title, description, created, updated FROM contents LEFT JOIN user ON user_id = user.id WHERE contents.id=? ORDER BY created DESC LIMIT 0, 10;",
      [id],
      (err, topics) => {
        if (err) throw err;
        connection.end();
        res.send(topics);
      }
    );
  }
});

/* READ MORE CONTENTS */
/* /api/content/page?page={} */
router.get("/page", (req, res) => {
  let connection = mysql.createConnection(dbconfig);
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let pageNumber = queryData.page;
  let startIndex = pageNumber * 10;

  connection.query(
    "SELECT contents.id, user_id, user.nickname AS author, title, description, created, updated FROM contents LEFT JOIN user ON user_id = user.id ORDER BY created DESC LIMIT ?, 10;",
    [startIndex],
    (err, contents) => {
      if (err) throw err;
      connection.end();
      res.send(contents);
    }
  );
});

/* CREATE CONTENT */
/* /api/content/create */
router.post("/create", function (req, res) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let description = req.body.description;

  let connection = mysql.createConnection(dbconfig);
  connection.connect();

  connection.query(
    "INSERT INTO contents (title, description, user_id, created, updated) VALUES(?, ?, ?, NOW(), NOW())",
    [title, description, user_id],
    (err) => {
      if (err) throw err;
      connection.end();
      res.send("INSERTED");
    }
  );
});

/* UPDATE CONTENT */
/* /api/content/modify */
router.post("/modify", function (req, res) {
  let id = String(req.body.id);
  let title = req.body.title;
  let description = req.body.description;

  let connection = mysql.createConnection(dbconfig);
  connection.connect();

  connection.query(
    "UPDATE contents SET title=?, description=?, updated=NOW() WHERE id=?",
    [title, description, id],
    (err) => {
      if (err) throw err;
      connection.end();
      res.send("UPDATED");
    }
  );
});

/* DELETE CONTENT */
/* /api/content/delete */
router.post("/delete", function (req, res) {
  let id = req.body.id;
  let connection = mysql.createConnection(dbconfig);
  connection.connect();

  connection.query(`DELETE FROM contents WHERE id=?`, [id], (err) => {
    if (err) throw err;
    connection.end();
    res.send("Delete Completed");
  });
});

/* GET CONTENT FILTERED BY AUTHOR */
/* /api/content/get_by_author?author=${} */
router.get("/get_by_author", function (req, res) {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const user_id = queryData.user_id;
  let connection = mysql.createConnection(dbconfig);
  connection.query(
    "SELECT contents.id, user_id, user.nickname AS author, title, description, created, updated FROM contents LEFT JOIN user ON user_id = user.id WHERE user_id=? ORDER BY created DESC LIMIT 0, 10;",
    [user_id],
    (err, contents) => {
      if (err) throw err;
      connection.end();
      res.send(contents);
    }
  );
});

module.exports = router;
