# 게시판 만들기

Vue.js 와 데이터베이스(MySQL), 클라우드 서버(AWS) 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

일별 개발 일지는 [./record]() 에 저장합니다.

- 목표

- [Frontend](##Frontend)

- [Backend](##Backend)
  - [데이터베이스](###데이터베이스)
  - [express-router](###Express-Router)
- [AWS]

<br />

## 목차

- [AWS](https://github.com/hyunwoo045/vue3-board/tree/master/docs/aws)
- [Database](https://github.com/hyunwoo045/vue3-board/tree/master/docs/mysql/database)
- [일별 개발 기록](https://github.com/hyunwoo045/vue3-board/tree/master/docs/records)

<br />

## 목표

- AWS RDS
  - 데이터베이스 서버 구축
  - 원격 API 요청에 대한 데이터 응답
- 백엔드 코드 리팩토링

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

## Frontend

## Backend

### 데이터베이스

데이터베이스에 대한 노트는 아래 문서로 대체합니다.

[데이터베이스(MySQL)](https://github.com/hyunwoo045/vue3-board/tree/master/docs/mysql/database)

<br />

### Express Router

express-router 를 이용하여 백엔드 개발 환경을 간단히 구축해 보겠습니다.

설치 및 앱 구동까지를 아래의 커맨드로 구현합니다.

```bash
$ npm i express-generator -g
$ express backend --view=pug
$ cd backend
$ npm i
$ npm start
```
