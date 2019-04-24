---
layout: post
title:  이미지 업로드 하기
tags: [frontend]
---

blob은 big large object로 file 타입의 데이터를 나타내는데 사용되는 간접적인 객체이다.


`<input>`의 type을 file로 하면 (`<input type="file">`)하면 file을 input 할 수 있게 된다.
 이 file을 미리보기를 위해 사용하거나 다른 곳으로 전송하기 위해서 blob을 사용한다.
 
 
blob을 만드는 방법은 blob constructor (`blob()`)을 통해서 만들어 낸다.
 이 후 이 blob을 통해서 file 타입의 데이터를 유용할 수 있다.
 
 
* file 데이터를 미리보기로 사용하기 위해서 url이 필요하다면 `URL.createObjectURL()`을 이용하면 된다.
* blob으로 만들어진 데이터를 다시 file로 해석 하기 위해서는 `filereader`를 사용하면 된다.
* blob은 `slice()`로 잘라낼 수 있다. 이는 데이터 베이스나 통신 프로토콜 마다 다른 데이터 용량 한계에 맞추어서 사용하는데 이용된다.


위의 방법을 통해서 파일을 올리고 다시 해석 할 수 있다. 
이를 통해서 image를 올리려고 한다. 몇 가지 문제점을 살펴보자.


* image를 `input(file)`을 통해서 올리면 가로가 길고 세로가 짧은 방향으로 (혹은 exif 데이터의 rotate가 0' 일 때)로 고정되어 사용된다.
* input으로 바로 올라간 file의 데이터는 변경되지 않는다. 다시 말하면 image 파일의 데이터가 필요 이상으로 큰 경우 너무 과도한 데이터를 서버에 저장하게 되는 것이고 이는 통신에서 속도에도 영향을 주게 된다.


이를 해결하기 위해서 각각 답을 찾아보자

* exif-js, react-native-exif, react-grid-gallery 등의 라이브러리
  * 결국 단 하나도 성공하지 못했다. 뒤의 두 가지는 제쳐 두고, exif-js는 사용자도 많으니 
  어떻게 써보려고 했는데 script를 적용시켜도 EXIF를 찾을 수 없다는 소리나 하고 도대체 뭐가 
  문제인지 모르겠어 덕분에 하나도 진행이 안된다.
* canvas
  * canvas를 이용한다. canvas에 2d context를 만들고 drawimage 메소드를 사용한다. 
  그리고 결과는 canvas가 렌더링을 안 해준다. 도대체 뭐가 문제지 아오.