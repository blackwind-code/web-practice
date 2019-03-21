# 소개

이것은, NodeJS를 이용한 기초적인 웹 예제. 
먼저 코드를 읽어보고 실행시키는것을 권장하는 바 이다.

views/index.ejs 파일을 읽고,
public/style.css 파일과 public/index.js 파일을 읽고,
본 폴더의 server.js 파일을 읽어보는것이 좋다.

따라하라 다음 절차

# NodeJS 및 NPM 설치
```
sudo apt install -y nodejs npm
```
위는 우분투 리눅스의 경우.

# 본 폴더의 의존성 패키지 설치 
```
npm install
```
현 위치에서 실행. package.json을 참조하여 
본 예제 작동에 필요한 express 및 ejs 패키지를 설치한다

# 웹 서버 실행 
```
sudo node server.js
```
웹 서버를 실행한다

# 결과물 확인
웹 브라우저를 킨 뒤 http://<IP-주소> 로 접속한다.