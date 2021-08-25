## ~ 8. 20. 진행 현황

### 성과

- Front 개발 환경 구축
- 홈 페이지(글 목록 출력) 및 글쓰기 페이지 기능 구현 (스타일 구현 필요)
- MySQL의 설치
- SQL 기초 개념 학습
- MySQL Workbench 설치

자세한 학습 기록은 [docs/mysql/database](https://github.com/hyunwoo045/vue3-board/tree/master/docs/mysql/database) 에 기록합니다.

### 8. 20 목표

- Backend 환경 구축
- API 요청 / 응답 구현
- Database 연결

## 기록 (08. 20)

### Backend 환경 구축

Backend의 Git 레파지토리를 우선 따로 구분합니다. 나중에 통합합니다. [저장소](https://github.com/hyunwoo045/vue3-board-express)

Express 로 백엔드 개발 환경을 구축합니다.

```bash
$ npm i express-generator -g
$ express backend --view=pug
$ cd backend
$ npm i
$ npm start
```

테스트를 위한 JSON 데이터를 임시로 작성합니다.

```json
// ./fortest.json
[
  {
    "id": 1,
    "title": "NodeJs",
    "description": "NodeJS is ...",
    "author": "Apple",
    "password": "apple"
  },
  {
    "id": 2,
    "title": "MySQL",
    "description": "MySQL is ...",
    "author": "Banana",
    "password": "1234"
  },
  {
    "id": 3,
    "title": "Vue",
    "description": "Vue.js is ...",
    "author": "Cherry",
    "password": "1111"
  }
]
```

`routes` 디렉토리에 test.js 파일을 하나 생성한 후 아래와 같이 작성합니다.

```javascript
var express = require("express");
var router = express.Router();
var data = require("../fortest.json");

router.get("/", function (req, res, next) {
  res.send(data);
});

module.exports = router;
```

- 요청이 들어올 경우 fortest.json 의 데이터를 response.

마지막으로 `./app.js` 에 라우터를 선언 및 연결해 줍니다.

```javascript
// ...
var testRouter = require("./routes/test");
app.use("/api/test", testRouter);
```

### API 요청 / 응답 구현

프론트엔드 측에서 백엔드 측 데이터를 받아올 수 있도록 설정할 필요가 있어 환경을 구축해보려 하였습니다. 데이터베이스 자료를 백엔드 환경에서 제공할 수 있도록 하게 하기 위함입니다.

Backend 환경에서 데이터를 받기 위해서 직접 `localhost:3000/api/test` 와 같은 방식으로 받아오려 했으나, 오류가 발생하였습니다.

```javascript
// ~/router/Container.vue

// 오류 코드
export default {
  created() {
    this.$http.get("localhost:3000/api/test").then((response) => {
      console.log(response);
    });
  },
};
```

원인은 CORS (Cross Origin Resource Sharing) 이라고 하는 브라우저-서버 간의 보안 정책 때문인 듯합니다. [참고 자료](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html#23-%EC%8B%A4%EC%A0%9C-api-%EC%97%B0%EB%8F%99-devserverproxy)

검색 자료를 바탕으로 `webpack.config.js` 를 수정하여 프록싱이 가능하도록 설정하였습니다.

```javascript
module.exports = {
  // ....
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

- 개발서버에 들어온 http 요청 중 /api 로 시작되는 것은 `localhost:3000' 으로 요청하도록 합니다.

```javascript
// ~/router/Container.vue

// 오류 코드
export default {
  created() {
    this.$http.get("/api/test").then((response) => {
      console.log(response);
    });
  },
};
```

<br />
