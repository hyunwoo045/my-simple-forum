let express = require("express");
let mysql = require("mysql");
var url = require("url");
let router = express.Router();
let dbkey = require("../key/dbkey");

const dbConfig = new dbkey().config;

/* READ CONTENTS */
/* /api/content | /api/content?id=[] */
router.get("/", (req, res) => {
  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let id = queryData.id;
  let _query = "";
  if (id === undefined) {
    _query = "SELECT * FROM contents ORDER BY created DESC LIMIT 0, 10";
    connection.query(_query, (err, topics) => {
      if (err) throw err;
      connection.end();
      res.send(topics);
    });
  } else {
    connection.query(
      "SELECT * FROM contents WHERE id=?",
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
  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let pageNumber = queryData.page;
  let startIndex = pageNumber * 10;

  connection.query(
    "SELECT * FROM contents ORDER BY created DESC LIMIT ?, 10",
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

  let connection = mysql.createConnection(dbConfig);
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
  let connection = mysql.createConnection(dbConfig);
  connection.connect();

  connection.query(`DELETE FROM contents WHERE id=?`, [id], (err) => {
    if (err) throw err;
    connection.end();
    res.send("Delete Completed");
  });
});

router.get("/get_by_author", function (req, res) {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const author = queryData.author;
  console.log(author);
  let connection = mysql.createConnection(dbConfig);
  connection.query(
    `SELECT * FROM contents WHERE author=? ORDER BY created DESC`,
    [author],
    (err, contents) => {
      if (err) throw err;
      connection.end();
      res.send(contents);
    }
  );
});

module.exports = router;
