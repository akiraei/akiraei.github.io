
## [Binary Data 조작하기](http://mohwa.github.io/blog/javascript/2015/08/31/binary-inJS/)
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



  

- [fs.writeSync](https://nodejs.org/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position)
- [ArrayBuffer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [DataView](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- [413 error](https://webisfree.com/2018-03-29/nginx-413-request-entity-too-large-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%82%AC%EC%9D%B4%EC%A6%88)
- js: array-buffer, nodejs: buffer



- front: input[type=file] --> fileReader --(arrayBuffer)--> dataview --(getUint8(i))--> arr --(axios.post(address, {arr}))
- back: req.body.arr --> buffer.alloc(req.body.arr.length) --> buffer[i]=req.body.arr[i] --> fs.appendFileSync(name, buffer) 
- [**fs.appendFileSync는 buffer의 데이터가 Uint8인지 어떻게 아는걸까?**](https://nodejs.org/api/buffer.html#buffer_buf_index)