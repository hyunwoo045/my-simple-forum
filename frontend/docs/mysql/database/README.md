## 데이터베이스

데이터베이스의 핵심

- 어떻게 입력할 것인가?
- 어떻게 출력할 것인가?

입력을 어떻게 할 것인가?

- Create
- Update
- Delete

출력을 어떻게 할 것인가?

- Read

그 어떤 데이터베이스를 만나더라도 CRUD (Create, Read, Update, Delete) 가 가장 중요하다.

<br />

## MySQL 설치

Window 설치법

- 쉽게 MySQL, Apache 등을 한 번에 설치해주는 Bitnami 를 받아 설치하도록 하자.
- [설치 페이지](https://bitnami.com/stack/wamp/installer)

MacOS 설치법

[생활코딩](https://opentutorials.org/course/3161/19532) <- 강의 참고!

설치가 완료되면 `cmd` 창을 연 후 mysql.exe 가 설치되어 있는 경로로 이동한 후에 아래와 같이 실행한다.

```bash
$ cd C:\Bitnami\wampstack-8.0.9-0\mariadb\bin
$ mysql -uroot -p

Enter password: ********
```

<br />

## MySQL의 구조

(그림 파트)

| 데이터베이스         | 파일 |
| -------------------- | ---- |
| 표 (table)           | 파일 |
| 데이터베이스(schema) | 폴더 |

데이터베이스는 스키마라는 표들을 하나로 Grouping 하는 말로 쓰이기도 한다.

<br />

## 데이터베이스(schema)의 생성, 삭제, 확인

- 데이터베이스 생성

```
CREATE DATABASE database-name;
```

- 데이터베이스 삭제

```
DROP DATABASE database-name;
```

- 데이터베이스 목록 확인

```
SHOW DATABASES;
```

특정 데이터베이스를 사용하기 위해서는 해당 데이터베이스를 사용하겠다는 명령을 내려주어야 한다.

```
USE database-name;
```

<br />

## SQL

Structured <br />
Query<br />
Language<br />

관계형 데이터베이스라는 카테고리에 속하는 제품들이 공통적으로 데이터베이스 서버를 제어할 때 사용하는 언어.

<br />

## 표 (table)

| id  | title  | description  | created  |
| --- | ------ | ------------ | -------- |
| 1   | MYSQL  | MySQL is...  | 2018-1-1 |
| 2   | Oracle | Oracle is... | 2018-1-3 |

위와 같은 형태를 표, table 이라고 한다.<br />
수평 - 행, row, record<br />
수직 - 열, column

### 표 생성

```SQL
CREATE TABLE topic(
  c1 Datatype(LENGTH),
  c2 Datatype(LENGTH),
  ...
);

CREATE TABLE topic(
    -> id INT(11) NOT NULL AUTO_INCREMENT,
    -> title VARCHAR(100) NOT NULL,
    -> description TEXT NULL,
    -> created DATETIME NOT NULL,
    -> author VARCHAR(30) NULL,
    -> profile VARCHAR(100) NULL,
    -> PRIMARY KEY(id));
```

- NOT NULL : 입력값이 없지 않도록 한다.
- AUTO_INCREMENT : 중복을 방지한다.
- PRIMARY KEY : 기본키를 설정한다.

DATATYPE 요약
문법 | 내용
-|-
INT | 정수 (약 -20억~20억)
BIGINT | 매우 큰 정수

<br />

## 표의 CRUD

### 생성(CREATE) - INSERT

```sql
INSERT INTO topic (title, description, created, author, profile) values('MySQL', 'MySQL is ...', NOW(), 'moonsdog', 'developer');
```

- `INSERT INTO 테이블이름 (속성1, 속성2 ...) VALUES (값1, 값2 ...);`
- `NOW()` : 현재 시간을 알려주는 함수

- topic 테이블의 구조를 확인하기 위해서는 `DESC` 키워드를 사용한다.

```sql
DESC topic;
```

<br />

### 읽기 (READ) - SELECT <br />

가장 많이 사용하게 될 키워드이며 사용 방법이 무궁무진하므로 가장 집중해야 한다.

`SELECT (속성1, 속성2...) FROM (테이블이름) WHERE (조건)`

```sql
SELECT * FROM topic;
```

- 위 문장은 topic 테이블 안에 있는 모든 데이터를 확인.
- 함부로 사용하지 않도록 하자. 너무 많은 데이터를 사용하게 되어 컴퓨터가 다운되기 쉬움.
- 전체 데이터 중 일부만 보고 싶다면 LIMIT 을 써보자.
  - `SELECT * FROM topic LIMIT 2` - 전체 데이터 중 2개만 확인

```sql
SELECT id, title, created, author FROM topic WHERE author='egoing';

+----+---------+---------------------+--------+
| id | title   | created             | author |
+----+---------+---------------------+--------+
|  2 | Oracle  | 2021-08-20 08:33:04 | egoing |
|  5 | MongoDB | 2021-08-20 08:35:49 | egoing |
+----+---------+---------------------+--------+
```

- author 가 'egoing' 인 레코드를 id, title, created, author 로 출력

```sql
SELECT id, title, created, author FROM topic WHERE author='egoing' ORDER BY id DESC;
```

- ORDER BY (속성) (DESC | ASC) : 속성을 기준으로 오름차순(내림차순) 으로 정렬

<br />

### 수정(UPDATE) - UPDATE

`UPDATE (테이블이름) SET ('변경할 속성' = '내용'), ... WHERE (조건);`

```sql
UPDATE topic SET description='Oracle is ...', title='Oracle' WHERE id=2;
```

- WHERE 문을 빠트리면 재앙이 닥치므로 주의하자.

<br />

### 삭제(DELETE) - DELETE

`DELETE FROM (테이블이름) WHERE (조건)`

```sql
DELETE FROM topic WHERE id=5;
```

- 마찬가지로 WHERE 문을 빠트린다거나 하는 실수를 하면 새로운 인생의 전환점을 맞이하므로 주의하자.

<br />

## 관계형 데이터베이스의 필요성

```
+----+------------+-------------------+---------------------+--------+---------------------------+
| id | title      | description       | created             | author | profile                   |
+----+------------+-------------------+---------------------+--------+---------------------------+
|  1 | MySQL      | MySQL is ...      | 2021-08-20 08:31:08 | egoing | developer                 |
|  2 | Oracle     | Oracle is ...     | 2021-08-20 08:33:04 | egoing | developer                 |
|  3 | SQL Server | SQL Server is ... | 2021-08-20 08:34:20 | duru   | data administrator        |
|  4 | PostgreSQL | PostgreSQL is ... | 2021-08-20 08:35:07 | taeho  | data scientist, developer |
|  5 | MongoDB    | MongoDB is ...    | 2021-08-20 08:35:49 | egoing | developer                 |
+----+------------+-------------------+---------------------+--------+---------------------------+
```

위 테이블에는 두 속성에 걸쳐 egoing 은 devloper 다 라고 하는 데이터가 중복이 되고 있다.

중복은 항상 개선의 여지가 필요함을 알리는 신호이다. 만약 'egoing' 이라는 아이디를 변경하려 한다면 위 표에서 3개의 레코드를 모두 수정해야 하는 번거로움이 있다.

이런 문제들을 개선하기 위해 테이블을 분해한다. ([정규화]())

```
+----+--------+---------------------------+
| id | name   | profile                   |
+----+--------+---------------------------+
|  1 | egoing | developer                 |
|  2 | duru   | database administrator    |
|  3 | taeho  | data scientist, developer |
+----+--------+---------------------------+
```

author 라는 테이블을 따로 생성하여 author 에 대한 정보(이름, 프로필)을 담아둔다.

topic 테이블에서는 author, profile 에 해당하는 정보는 author 테이블이 가지고 있으므로 두 열을 삭제하고 author 테이블의 id 값을 추가함으로써 관계를 생성함과 동시에 테이블을 분리가 된다.

```
+----+------------+-------------------+---------------------+-----------+
| id | title      | description       | created             | author_id |
+----+------------+-------------------+---------------------+-----------+
|  1 | MySQL      | MySQL is ...      | 2021-08-20 09:37:51 |         1 |
|  2 | Oracle     | Oracle is ...     | 2021-08-20 09:38:07 |         1 |
|  3 | SQL Server | SQL Server is ... | 2021-08-20 09:38:25 |         2 |
|  4 | PostgreSQL | PostgreSQL is ... | 2021-08-20 09:38:42 |         3 |
|  5 | MongoDB    | MongoDB is ...    | 2021-08-20 09:38:58 |         1 |
+----+------------+-------------------+---------------------+-----------+
```

이로써 author 에 대한 정보를 수정한다 하더라도 author 테이블에서 한 번만 수정하면 topic 테이블에서도 그 변경사항을 적용할 수 있게 되었다.

### - JOIN

하지만 위와 같이 테이블을 분리함으로써 읽을 때에 불편함이 생겼다. topic 테이블에서 MySQL 제목의 글을 읽을 때에 이 글을 생성한 사람이 누군지 알기 위해서는 author 테이블도 읽어와야 하는 것이다.

이를 해결하기 위해 단 한 번 읽었을 때에 두 테이블 (혹은 여러 테이블)이 처음부터 합쳐져 있었던 것 처럼 출력이 되도록 한다.

`SELECT \* FROM (테이블1) LEFT JOIN (테이블2) ON (조건)

```SQL
SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id;

+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
| id | title      | description       | created             | author_id | id   | name   | profile                   |
+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
|  1 | MySQL      | MySQL is ...      | 2021-08-20 09:37:51 |         1 |    1 | egoing | developer                 |
|  2 | Oracle     | Oracle is ...     | 2021-08-20 09:38:07 |         1 |    1 | egoing | developer                 |
|  3 | SQL Server | SQL Server is ... | 2021-08-20 09:38:25 |         2 |    2 | duru   | database administrator    |
|  4 | PostgreSQL | PostgreSQL is ... | 2021-08-20 09:38:42 |         3 |    3 | taeho  | data scientist, developer |
|  5 | MongoDB    | MongoDB is ...    | 2021-08-20 09:38:58 |         1 |    1 | egoing | developer                 |
+----+------------+-------------------+---------------------+-----------+------+--------+---------------------------+
```

- author_id, id 속성이 쓸데없이 들어가 있으므로 삭제해본다.

```SQL
SELECT topic.id, title, description, created, name, profile FROM topic LEFT JOIN author ON topic.author_id = author.id;

+----+------------+-------------------+---------------------+--------+---------------------------+
| id | title      | description       | created             | name   | profile                   |
+----+------------+-------------------+---------------------+--------+---------------------------+
|  1 | MySQL      | MySQL is ...      | 2021-08-20 09:37:51 | egoing | developer                 |
|  2 | Oracle     | Oracle is ...     | 2021-08-20 09:38:07 | egoing | developer                 |
|  3 | SQL Server | SQL Server is ... | 2021-08-20 09:38:25 | duru   | database administrator    |
|  4 | PostgreSQL | PostgreSQL is ... | 2021-08-20 09:38:42 | taeho  | data scientist, developer |
|  5 | MongoDB    | MongoDB is ...    | 2021-08-20 09:38:58 | egoing | developer                 |
+----+------------+-------------------+---------------------+--------+---------------------------+
```

- SELECT 뒤에서 `topic.id` 를 그냥 `id` 라고만 했을 때에는 author.id 와 topic.id 둘 중에 어떤 것을 사용하는지 모호하므로 syntax error 가 뜬다. 잘 정의 해주도록 하자.
- 결과 테이블에 `id`를 `topic_id`로 바꾸고 싶다면 `SELECT topic.id AS topic_id ...` 하면 됨.

<br />

## MySQL Workbench 설치

[설치 페이지](https://dev.mysql.com/downloads/workbench/)

- 운영 체제에 맞는 프로그램을 받아 간단히 설치 가능.

<br />

## 데이트베이스 보안

### - SQL Injection

외부로부터 들어온 정보에 의해 데이터베이스가 조작되어 생기는 문제.

아래의 코드는 사용자가 전송해온 URL의 쿼리로부터 id 값을 전달받아 그를 바탕으로 SQL query를 실행하는 코드이다.

```javascript
// ... connection
const _url = req.url;
const queryData = url.parse(_url, true).query;
const id = queryData.id;

connection.query(`SELECT * FROM contents WHERE id=${id}`, (err, contents) => {
  if (err) throw err;
  console.log(contents);
});
```

```URL
https://localhost:8080?id=1
```

위와 같이 정상적인 url 이 들어온다면 코드에 문제는 없을 것이다. 하지만 아래와 같은 url을 사용자가 입력한다면 문제가 생긴다.

```URL
https://localhost:8080?id=1;DROP TABLE contents;
```

이 때 실행될 쿼리문은 `SELECT * FROM contents WHERE id=1;DROP TABLE contents;` 로 contents 테이블의 모든 기록을 출력하고 contents 테이블을 삭제해버렸다.

보간법을 사용하면 전체 문장을 한 명령으로 보기 때문에 2개의 쿼리문이 모두 동작한 것이다. 이를 방지하기 위해서 아래와 같이 코드를 수정한다.

```javascript
// ... connection
// ... get id

connection.query("SELECT * FROM contents WHERE=id=?", [id], (err, contents) => {
  if (err) throw err;
  console.log(contents);
});
```

일반 문자열 내에 동적으로 바뀌는 값은 `?` 로 입력해두고 치환될 값은 `query` 메서드의 두 번째 인자에 배열로 값을 입력한다.

이와 같이 코드를 작성하면 위의 공격성을 가진 url 이 들어오더라도 아래와 같은 쿼리가 실행된다.

```SQL
SELECT * FROM contents WHERE id='1;DROP TABLE contents;';
```

치환된 값을 문자열로 인식하기 때문에 `;` 뒤의 명령 또한 문자열로 입력되고, id 필드는 INT(11) 이므로 에러가 발생하게 된다.

<br />

### - Escaping

공격적 의도를 가진 javascript 코드를 작성하고 이를 웹 브라우저로 실행할 때 공격목적을 달성하는 공격 기법을 Cross site scripting (XSS) 이라고 한다.

아래와 같은 코드가 있다고 하자.

```javascript
// ... get title, description by POST
const title = req.body.title;
const description = req.body.description;

const template = `
<div class="title"> ${title} </div>
<div class="description"> ${description} </div>
`;
// ... render template
```

그리고 사용자가 아래와 같이 description 을 작성했다고 한다.

```
제목: XSS
내용:
<script>
  alert('HaHa ha!!!')
</script>
```

이 내용을 받고 랜더링 된다면 실제로 자바스크립트 코드가 실행되고 알림창이 뜨는 것을 볼 수 있다.

이를 미연에 방지해야 한다.

방지하는 법

- Sanitize

```
$ npm i sanitize-html
```

위 패키지를 이용하여 사전에 작성되지 않은 위험한 Javascript 코드가 사용자 입력으로 들어오게 되면 코드를 실행하지 않고 탈출(Escaping)하는 기법을 적용한다.
