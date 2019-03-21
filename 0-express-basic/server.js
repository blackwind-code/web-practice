// [---------------------------------------------  Initialization Step -----------------------------------------------]

// "require" 함수를 통해 node_modules 내 설치된 라이브러리들을 불러온다.
// "npm" 툴을 통해 라이브러리를 설치한다면 그것들은 node_modules 폴더 내에 라이브러리 파일이 저장되고
// 현 폴더 내 package.json 파일에 의존성 정보가 기록됨.

// express(웹 서버 라이브러리)를 불러온다.
const express = require('express');

// express() 실행을 하여 웹 서버 인스턴스를 생성한다. 
const app = express();

// 우리의 웹 인스턴스가, Response 텍스트로부터 JSON 데이터를 파싱할 수 있게 한다.
app.use(express.json());

// "view engine" 이란, 템플릿 파일들을 적절히 처리하여, html으로 변환한 뒤 
// 클라이언트에게 보내주는 역활을 한다.
// 우리는 "ejs"를 "view engine" 로 사용할 것이다.
// "ejs" 는 node_modules 로 부터 로드된다.
app.set('view engine', 'ejs');
// "ejs" 모듈은 기본적으로, 프로젝트 폴더 내의 "views" 폴더를 scope로 삼는다. (그 안의 템플릿 파일들을 사용한다.)

// [---------------------------------------------  Initialization Step -----------------------------------------------]






// [---------------------------------------------       Add routes     -----------------------------------------------]

// 우리의 웹 서버에 라우트 경로들을 등록한다. 
// 라우트란, 쉽게 말해, ~ 경로로 클라이언트가 요청을 보내온다면,
// 어떤 처리를 한 뒤에, 어떤 답변 보낼것인가? 를 정의하는것이다.
// 따라서 클라이언트가 요청한 URL이 우리 서버에 등록된 라우트가 아니라면, 적절히 처리되지 않는다. (404 Not found)

// 클라이언트의 URL 요청 중, "http://서버주소/public" 으로 시작하는 모든 URL 요청들은 
// 현재 디렉토리(__dirname) 내의, "public" 이라는 디렉토리 액세스로 맵핑을 한다.
// 즉, 예를 들어, http://서버주소/public/style.css 요청이 온다면
// 현재 디렉토리 내 "public" 폴더 내의 style.css 파일을 클라이언트에게 반환하게 한다.
app.use('/public', express.static(__dirname + "/public"));

// 클라이언트가 "/" 경로("http://서버주소/")로 요청을 해왔다면,
// 우리가 "view engine" 으로 셋팅한 "ejs" 모듈이,
// 현재 디렉토리 내 "views" 디렉토리 안의 "index.ejs" 템플릿 파일을 로드 한 뒤,
// 적절히 렌더링 하여 html로 만들고 클라이언트에게 답변으로 보낸다.
// HTTP GET 요청에 대해 라우트를 등록하려면, app.get('경로', ... 를 사용하면 된다.
app.get('/', function(req, res) {
    // 이 함수는 GET / 라우트로 요청이 왔을때 어떤 행동을 취할 것인가? 에 대한 콜백 함수이다.
    // 함수의 인자로 받게 되는 "req" 오브젝트는 클라이언트의 요청 정보(경로, 클라이언트 주소, HTTP 헤더 등등...)들을 담고있다.
    // "res" 오브젝트는 클라이언트에게 답변을 보내기 위한 프로퍼티와 메소드 들을 보유하고 있다.

    // "req" 오브젝트로부터 클라이언트 IP 주소를 알아낸다.
    let client_ip = req.connection.remoteAddress;
    console.log("Connection from: " + client_ip);

    let ejs = {
        ip_addr: client_ip,
        text: "마때리다때리마때리다때리마다때리빠삔다"
    };

    // index.ejs 템플릿 파일을 로딩한 뒤, 위의 ejs 오브젝트 정보를 통해
    // 템플릿 파일 안의 변수들을 적절한 값으로 치환한다.
    res.render('index', ejs);
});

// /api 경로로 HTTP GET 요청이 왔을때 적절히 처리를 한다.
app.get('/api', function(req, res) {
    // 요청 내용을 프린트 한다.
    console.log("도착한 메시지 내용: " + req.query.msg);

    let response_text = "";
    for (let i = 0; i < 3 + Math.random() * 7; i++) 
    {
        let rand_num = Math.random();
        if (rand_num > 0.7)
        {   response_text += "마"   }
        else if (rand_num > 0.5) 
        {   response_text += "다"   }
        else if (rand_num > 0.3)
        {   response_text += "빠삔다"   }
        else if (rand_num > 0.2)
        {   response_text += " !!"  }
        else 
        {   response_text += "때리"}
    }

    // 이 라우트로의 요청에 대한 답변은 JSON 형식으로 클라이언트에게 보낸다.
    let return_data = {
        msg: response_text
    };

    res.json(return_data);
});

// [---------------------------------------------       Add routes     -----------------------------------------------]






// [---------------------------------------------   Start web server   -----------------------------------------------]

// 웹 서버를 시작하고, 서버의 80번 포트로 오는 요청을 처리하도록 한다.
app.listen(80);
// 웹 서버는 무한 루프에 빠진다. 종료하기 전까지는 항상 작동을 하고 있는 상태이며,
// 우리가 상단에 정의한 라우트에 따라, 클라이언트에서 보내는 요청을 적절히 처리한다.

// [---------------------------------------------   Start web server   -----------------------------------------------]