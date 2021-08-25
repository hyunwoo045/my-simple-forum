var express = require("express");
var mysql = require("mysql");
var router = express.Router();

router.post("/", function (req, res) {
  let id = req.body.id;
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  connection.query(`DELETE FROM contents WHERE id=?`, [id], (err) => {
    if (err) throw err;
    res.send("Delete Completed");
  });
});

module.exports = router;
