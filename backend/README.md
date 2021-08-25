# Node.js (Express) + MySQL

```bash
$ npm install -S mysql
```

MySQL 서버와의 연결은 아래와 같이 합니다.

```javascript
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost", // 호스트 서버
  user: "root", // 사용할 유저
  password: "hwoo045rla", // 유저의 비밀번호
  database: "tutorial", // 사용할 서버 내의 데이터베이스
});

connection.connect(); // 연결

// createConnection().query('쿼리문', 콜백함수(에러, 결과, ))
connection.query("SELECT * FROM topic", function (err, res, fields) {
  if (err) {
    console.log(err);
  }
  data = res;
});
```

위 코드를 home 라우터에 적용하여 앞단에서 홈에 접속할 경우 바로 db의 데이터를 전송해주는 방식으로 우선 구현합니다.

```javascript
// ./routes/home.js
var express = require("express");
var mysql = require("mysql");
var router = express.Router();
let data = [];

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "tutorial",
});

connection.connect();
connection.query("SELECT * FROM topic", function (err, res, fields) {
  if (err) {
    console.log(err);
  }
  data = res;
});

router.get("/", function (req, res, next) {
  res.send(data);
});

module.exports = router;
```
