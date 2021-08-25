# 게시판 만들기

Vue.js 와 데이터베이스(MySQL), 클라우드 서버(AWS) 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

일별 개발 일지는 [./record]() 에 저장합니다.

<br />

## 목차

- [Frontend](#Frontend)
  - [vue-router](#Vue-Router)
  - [axios를 이용한 API 요청](#axios로-API-요청)
  - [Webpack Proxy 설정](#Webpack-Proxy-설정)
- [Backend](#Backend)
  - [node.js mysql](#Node.js-MySQL)
  - [Express Generator](#Express-Generator)
- [데이터베이스](#데이터베이스)
- [AWS](https://github.com/hyunwoo045/vue3-board/tree/master/docs/aws)

<br />

## 목표

### 8월 25일

- AWS RDS
  - 데이터베이스 서버 구축
  - 원격 API 요청에 대한 데이터 응답
- 백엔드 코드 리팩토링

---

## Frontend

### Vue Router

문서 작업 예정

<br />

### axios로 API 요청

우선 axios 를 설치합니다.

```
$ npm install axios
```

모듈을 사용하기 위해서 `app.js` 에 등록해줍니다

```javascript
// ./src/app.js

import axios from 'axios';
import VueAxios from 'vue-axios';

createApp(App).use(VueAxios, axios).mount(#app);
```

이제 특정 컴포넌트에서 API 요청을 해보겠습니다.

```html
<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    created() {
      this.$http.get("https://localhost:3000").then((response) => {
        this.message = response.data;
      });
    },
  };
</script>
```

`localhost:3000` 로 부터 응답을 받아 `message` 에 대입 시키는 아주 간단한 코드입니다.

하지만 이렇게 API 요청을 보내면 에러가 발생합니다. CORS (Cross Origin Resource Sharing)이라고 하는 브라우저-서버 간의 보안 정책 때문입니다. 현재는 localhost로 같은 도메인임에도 불구하고 포트번호가 8080과 3000으로 다르기 떄문에 다른 서버로 인식하는 듯 합니다.

이를 해결하기 위해 Webpack 개발 서버에서 api 서버로 프록싱을 합니다.

[Webpack Proxy 설정](#Webpack-Proxy-설정)

위에서 axios 모듈을 이용하여 get 방식으로 API 요청을 하는 예제 코드를 작성했습니다. <br />
아래는 post 방식으로 API 요청을 하는 예제 코드 입니다.

```html
<script>
  export default {
    data() {
      return {
        title: "Vue.js",
        description: "Vue.js is ...",
      };
    },
    addContent() {
      this.$http
        .post("/api/insert", {
          title: this.title,
          description: this.description,
        })
        .then((response) => {
          console.log(response);
        });
    },
  };
</script>
```

`$http.post()` 메서드의 두번째 인자로 보낼 데이터를 객체 형식으로 지정합니다.

<br />

### Webpack Proxy 설정

`webpack.config.js` 의 devServer에 proxy 속성을 추가합니다.

```javascript
// ./webpack.config.js

module.exports = {
  // ....
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

개발 서버에 들어온 모든 http 요청 중 /api 로 시작되는 것은 모두 `http://localhost:3000`로 요청하도록 하는 설정이다.

`webpack.config.js` 를 수정한 후에는 아래와 같이 앱에서 API 요청을 할 수 있게 된다.

```html
<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    created() {
      this.$http.get("/api").then((response) => {
        // get 메서드에 url을 입력한 부분
        this.message = response.data;
      });
    },
  };
</script>
```

<br />

---

## Backend

### Express Generator

express-generator 를 이용하여 백엔드 개발 환경을 간단히 구축해 보겠습니다.

설치 및 앱 구동까지를 아래의 커맨드로 구현합니다.

```bash
$ npm i express-generator -g
$ express backend --view=pug
$ cd backend
$ npm i
$ npm start
```

```javascript
// ./bin/www

var app = require("../app");
var debug = require("debug")("backend:server");
var http = require("http");

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
```

`bin/www` 의 내용을 보니 3000번 포트에서 동작합니다. `localhost:3000` 에서 동작하는지 웹 브라우저를 열어 확인해봅니다.

`app.js` 에는 사용자 접속 시 입력한 url마다 어떻게 라우팅 시킬 것인지에 대한 설정이 보입니다. `localhost:3000/` 와 `localhost:3000/users` 로 접속하였을 때에 `indexRouter`, `usersRouter` 에 연결되는 것을 알 수 있습니다.

```javascript
var express = require("express");
var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);
```

`./routes/index.js` 를 살짝 수정해 봅니다. `localhost:3000` 로 접속 시 'Hello World!' 를 응답 데이터로 보내보겠습니다.

```javascript
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello World!");
});

module.exports = router;
```

브라우저에서 `localhost:3000` 로 접속해보면 Hello World! 가 잘 출력되는 것을 볼 수 있습니다.

<br />

### Node.js MySQL

Node.js 환경에서 mysql 을 제어하기 위해 패키지를 설치합니다.

```
$ npm install mysql
```

`localhost:3000` 에 접속하면 데이터베이스의 내용을 출력하도록 코드를 수정해보겠습니다.

현재 localhost의 데이터베이스 서버에는 tutorial 이라는 db가 존재하고 그 안에는 `contents`, `comments` 라고 하는 스키마들이 저장되어 있습니다.

```
host: localhost
user: root
password: 111111
```

contents 의 내용은 아래와 같습니다.
id | title | description | author | created | updated
-|-|-|-|-|-
8 |HTTP |HTTP is HyperText Transfer Protocol ! | 2021-08-23 15:21:27 |2021-08-23 15:21:46
10 |CSS |CSS is ... |moonsdog| 2021-08-23 16:03:22 |2021-08-23 16:03:22
11 |Javascript |Javascript is ...| akaps |2021-08-23 16:46:18| 2021-08-23 16:46:18
12 |Node.js |Node.js is ... |egoing |2021-08-23 16:46:33 2021-08-23 |16:46:33

`./routes/index.js` 의 코드를 수정합니다.

```javascript
// ... require parts (생략)
var mysql = require("mysql");

router.get("/", function (req, res, next) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });

  connection.query(`SELECT * FROM contents`, (err, contents) => {
    if (err) throw err;
    res.send(contents);
  });
});

module.exports = router;
```

- require로 mysql 모듈 가져오기
- `mysql.createConnection()` 메서드로 db server에 연결 및 tutorial db 를 사용하도록 함.
- `createConnection().query()` 메서드로 쿼리문 실행. 메서드의 두 번째 인자인 콜백 함수의 두 번째 인자 결과값을 내부에서 api 응답으로 전송.

<br />

---

## 데이터 베이스

데이터베이스에 대한 노트는 아래 문서로 우선 대체합니다.

[데이터베이스(MySQL)](https://github.com/hyunwoo045/vue3-board/tree/master/docs/mysql/database)

<br />

---

## AWS

AWS에 대한 노트느 아래 문서로 우선 대체합니다.

[AWS](https://github.com/hyunwoo045/vue3-board/tree/master/docs/aws)
