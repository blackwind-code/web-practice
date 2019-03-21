console.log("나는 로딩되었다.");

function buttonClick() {
    console.log("버튼이 클릭되었다.");
    // AXIOS는 웹 요청을 보내고 받기 위한 라이브러리다.
    // index.ejs 파일에서 index.js 스크립트(이 파일)을 로드하기 전에 먼저 로드한다.
    // 따라서 우리는 "axios" 오브젝트를 사용할 수 있다.
    
    let input_text = document.getElementById('text-input').value;
    
    let data = {
        msg: input_text
    };

    // data 오브젝트와 함께 "/api" 경로로 GET 요청을 보낸다.
    axios.get('/api', {params: data})
        // axios.get 함수는 Promise 오브젝트를 리턴하는 async 함수이다.
        // 따라서 보낸 요청에 대한 답변이 돌아왔을 때, 어떠한 행동을 취할지
        // .then Clause 를 통해 콜백 형태로 정의할 수 있다.
        .then(function(res) {
            let server_msg = res.data.msg;
            // 메시지를 페이지에 표시한다.
            document.getElementById('footer-text').innerHTML = server_msg;
        })
        // .catch Clause 는 에러가 있을시 catch 한다.
        .catch(function(err) {
            alert(err);
        });
}