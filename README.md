# TeamHamster

## 미션가이드

중고거래 사이트에서 직거래가 아닌, 먼거리에서 택배를 지원하는 사이트
일반 택배사이트처럼 택배기사의 위치를 확인 가능
결재는 현금거래가 아닌 포인트를 충전하여 거래하는 방식

## 레퍼런스

https://docs.google.com/document/d/1Lbk7PtXBUfBku5mMkZbMHQXitBpCQMp4umXeGECt414/edit?usp=sharing

## 사용한 기술 스택

Node.js, Mysql, MongoDB, typeScript, React, tailwindcss

## 사용법

### backend 폴더내 추가

.env

PORT=포트추가
MONGURL="mongodb://localhost:?????" (?????에 몽고DB 포트)
IV= Buffer 16자리 string으로
SALT="암호화 할 문자 salt 값"
KEY= Buffer 32자리 string으로
CLIENT_N_ID="네이버 client ID"
CLIENT_N_SECRET = "네이버 Client Secret"
CLIENT_G_ID = "구글 클라이언트 ID"
CLIENT_G_SECRET = "구글 클라이언트 보안 비밀번호"

config/config.json

```json
"development": {
"username": "username",
"password": "mysql 비밀번호",
"database": "dbname",
"host": "127.0.0.1",
"dialect": "mysql",
"timezone": "+09:00"
},
```

### fornt 폴더내 추가

.env

```
REACT_APP_BASE_URL = "리액트 주소 및 포트"
REACT_APP_SERVER_URL = "서버 주소 및 포트"
REACT_APP_SERVER_OAUTH_CALLBACK_URL = "서버 주소 및 포트 위와 동일"
REACT_APP_G_CLIENT_ID="구글 클라이언트 ID"
REACT_APP_N_CLIENT_ID="네이버 client ID"
```
