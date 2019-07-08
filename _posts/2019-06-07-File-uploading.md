---
layout: post
title: File uploading (TWIL) 
categories: [http]
tags: [frontend, html, http, backend, express, middleware, axios]
---

## 서버에 올리기 위해서 고려해야할 요소는 무엇이 있을까?
 - 통신 방식
   - ~~ftp~~
   - http
     - `content-type`은?: `multipart/form-data`
   - ~~websocket~~
   - ~~???~~
 - 서버 세팅
   - server 프레임워크는 무엇으로?: `express.js`
   - 필요한 middleware는?: `multer`
 - 프론트 세팅
   - 파일을 보낼 api: `<input>`과 `<form>`
 - 파일 포맷
   - ~~2진~~
   - ~~파일 그대로~~
   - ~~텍스트~~
   - ~~???~~
   
## 프론트 세팅
### HTML으로 보내기
[<form>으로 파일을 보낸다.](https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)
HTTP는 텍스트 프로토콜이기 때문에 2진 데이터(file)을 다루기 위해서 특별한 요구 사항이 있다. 

- `enctype` 속성
  - `enctype`은 `Content-Type HTTP` 헤더의 값을 지정할 수 있게 한다. 이는 서버에 데이터가 무슨 종류인지를 알려준다. 
  - 기본 값은 `application/x-www-form-urlencoded`; "이 폼 데이터는 url폼 형태로 인코딩되어 있다." 
  
- 파일을 보내기 위한 설정 2가지
  1. `method`를 `POST`로 지정: 파일 콘텐츠는 폼을 이용해 URL 매개 변수로 보낼수 없기 때문에
  1. `enctype`을 `multipart/form-data`로 지정: 데이터는 여러 조각으로 나누어 지고 각 파일 조각에 같이 보내질 폼바디 텍스트가 추가 됨.
     > ```html
     > <form method="post" enctype="multipart/form-data">
     >  <input type="file" name="myFile">
     >  <button>Send the file</button>
     > </form>
     > ```
  1. 많은 서버들이 남용을 예방하기 위해 HTTP 요청과 파일의 크기를 제한한다; 파일 전송 전에 서버 관리자에게 제한 크기를 확인하자.
  
- 파일을 보내기
  1. 위의 설정을 완료
  1. `<input type="file">`을 통해 파일을 `<input>`태그로 불러옴
  1. form을 submit하면 data가 서버로 전달됨.
  1. 서버;`express.js`에서 middleware;`multer`를 사용해서 data를 이미지로 변환해서 static으로 저장?!
  

### axios로 보내기
`axios`의 POST는 폼 데이터 전송을 사용하지 않기 때문에 서버쪽에서 파라메터를 수정 할 수 없다면 문제가 될 수 있지만
[`FormData`를 사용하여 보낼 수 있다.](https://doogle.link/axios-%EC%82%AC%EC%9A%A9%EC%8B%9C-%ED%8F%BC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EC%86%A1%ED%95%98%EA%B8%B0-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C/)

 - `<input type="file">`을 통해서 file을 받는다.
 - [`new FormData()`](https://developer.mozilla.org/ko/docs/Web/API/FormData)에 `.append` 메소드를 사용해서 file을 덧붙인다.
 - `axios`의 header 값을 설정한다; `Content-Type`을 `multipart/form-data`으로 설정
    > ```html
    > <form>
    >   <input type="file" name="photo" id="photo" />
    > </form>
    >
    > <script>
    > var frm = new FormData();
    > var photoFile = document.getElementById("photo");
    > frm.append("photo", photoFile);
    > axios.post('https://domain/form-post-url', frm, {
    >   headers: {
    >     'Content-Type': 'multipart/form-data'
    >   }
    > })
    > .then((response) => {
    >   // 응답 처리
    > })
    > .catch((error) => {
    >   // 예외 처리
    > })
    > </script>
    > ```

## 백엔드 세팅
### [express.js + multer](http://webframeworks.kr/tutorials/expressjs/expressjs_file_upload/)

[`multer`](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)는 `multipart/form-data`속성의 데이터를 처리해 주는 middleware이다.

  1. `npm install multer --save`
  1. post 라우터를 설정한다; `multer`를 middleware로 사용할 것.
     > ```js
     > var multer  = require('multer')
     > var upload = multer({ dest: 'uploads/' })
     > 
     > app.post('/profile', upload.single('avatar'), function (req, res, next) {
     >  // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
     >  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
     > })
     > ```
  1. `diskStorage`를 사용하면 static으로 저장되고, `memoryStorage`를 사용하면 메모리에 버퍼로 저장된다.
  1. `diskStorage`를 쓸 때, `filename`을 통해 저장될 파일 이름을 지정할 수 있다.



