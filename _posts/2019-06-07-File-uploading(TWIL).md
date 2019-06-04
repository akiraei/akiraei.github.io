---
layout: post
title: File uploading (TWIL) 
categories: [html]
tags: [frontend, html, http]
---

## 서버에 올리기 위해서 고려해야할 요소는 무엇이 있을까?
 - 통신 방식
   - ftp
   - http
   - websocket
   - ???
 - 서버 세팅
   - 파일을 받아줄 준비
 - 프론트 세팅
   - 파일을 보낼 함수
 - 파일 포맷
   - 2진
   - ~~파일 그대로~~
   - ~~텍스트~~
   - ~~???~~
   
## 통신 방식별로 파일 보내기
### HTTP
 
####  [`form`(HTML)으로 파일 보내기](https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)
 HTTP는 텍스트 프로토콜이기 때문에 2진 데이터(file)을 다루기 위해서 특별한 요구 사항이 있다. 
- `enctype` 속성
  - `enctype`은 `Content-Type HTTP` 헤더의 값을 지정할 수 있게 한다. 이는 서버에 데이터가 무슨 종류인지를 알려준다. 
  - 기본 값은 `application/x-www-form-urlencoded`; "이 폼 데이터는 url폼 형태로 인코딩되어 있다." 
- 파일을 보내기 위한 설정 2가지
  1. `method`를 `POST`로 지정: 파일 콘텐츠는 폼을 이용해 URL 매개 변수로 보낼수 없기 때문에
  2. `enctype`을 `multipart/form-data`로 지정: 데이터는 여러 조각으로 나누어 지고 각 파일 조각에 같이 보내질 폼바디 텍스트가 추가 됨.
   > ```html
   > <form method="post" enctype="multipart/form-data">
   >  <input type="file" name="myFile">
   >  <button>Send the file</button>
   > </form>
   > ```
   3. 많은 서버들이 남용을 예방하기 위해 HTTP 요청과 파일의 크기를 제한한다; 파일 전송 전에 서버 관리자에게 제한 크기를 확인하자.
- 파일을 보내기
  1. 위의 설정을 완료
  2. `<input type="file">`을 통해 파일을 `<input>`태그로 불러옴
  3. form을 submit하면 `data` 객체를 통해 서버로 전달됨
  4. 서버에서는 받은 `data` 객체에서 파일을 변환해서 static으로 저장?!

#### [Binary Data 조작하기](http://mohwa.github.io/blog/javascript/2015/08/31/binary-inJS/)
- `Blob` 유형
  - `Blob`은 미디어 파일과 같은 큰 용량의 파일
  - `Blob Object`는 File과 같은 불변객체(immutable); raw data를 갖는다.
-  `FileReader`
   - 파일의 raw data를 갖는 immutable 객체인 `Blob`을 읽어낼 수 있는 함수
     > ```js
     > var reader = new FileReader();
     > reader.addEventListener("loadend", function() {
     >    // reader.result contains the contents of blob as a typed array
     > });
     > reader.readAsArrayBuffer(blob);
     > ```  
   - 이를 통해서 `Blob`을 `ArrayBuffer`로 읽어 낼 수 있다.
- [`TypedArray`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Typed_arrays)
  - 배열 같은 객체로 raw binary data를 접근하기 위한 메커니즘을 제공
  - audio 및 video 조작과 같은 기능의 추가, websocket을 사용한 raw binary data 접근 등
   웹 어플리케이션이 강력해 짐에 따라, 빠르고 쉽게 raw binary data를 자바스크립트에서 접근하는 것이 필요해짐
  - `Array.isArray([TypadArray]) //false`
  - 유연성과 효율을 위해 버퍼와 뷰로 구현됨; `ArrayBuffer`, `DataView`
- [`ArrayBuffer`](https://ohgyun.com/418)
  - `ArrayBuffer`는 고정된 크기의 raw binary data를 나타내기 위해 사용되는 객체이다.
  - 데이터 덩어리(chunk)를 나타내는 객체
  - 컨턴츠에 접근할 메커니즘을 제공하지는 않음
  - immutable
  - 이는 `DataView`를 통해서 읽고 쓸 수 있다.
- [`DataView`](https://ohgyun.com/418)
  - `ArrayBuffer`의 컨텐츠에 접근하는 메커니즘을 제공
  - context(데이터 형, 시작 오프셋 및 엘리먼트 수)를 제공해 데이터를 실제 `TypedArray`로 바꿈
  - 로-레벨 인터페이스로 플랫폼에 `endianness`에 상관없이 `ArrayBuffer`를 읽고 쓸수 있다. 
  - 기본은 `big-endian`이고 메소드로 `little-endian`으로 설정 가능하다.
- [`endian`](https://ko.wikipedia.org/wiki/%EC%97%94%EB%94%94%EC%96%B8)
  - `endian`은 컴퓨터에서 데이터가 저장되는 순서를 말한다
  - `big-endian`은 상위 바이트부터, `little-endian`은 하위 바이트부터 데이터를 저장한다.
  - 산술연산유닛(ALU)은 메모리를 하위 바이트부터 읽기 때문에 `little-endian`이 속도에서 우위를 갖는다.
  - 네트워크 프로토콜 표준으로는 `big-endian`이 사용된다. 역사적으로 라우팅이 전화를 거는 식의 접두 부호로 이루어 졌기 때문이다.
  

