---
layout: post
title: Hide and Seek with Element (TWIL) 
categories: [css]
tags: [frontend, css]
---

## 요소를 숨기는과 보이는 방법과 사용법

html의 요소를 숨기기 위한 css 스타일에는 및 js 이용에는 다양한 방법이 있을 것이다.
그 중 몇까지를 알아보고 이에 대한 사용법을 알아보자

1.  CSS: `display: none`
  - css나 스타일을 통해서 설정한다.
  - 크롬의 인스펙터에서는 엘리멘트를 볼 수 있지만 다양한 보조 도구(screen_reader나 search_engine)에 검색되지는 않느다.
  - 내용이 검색되거나 액션 및 버튼이 없는 곳에서 사용하기 용이하다.
  
2. CSS: `visibility: hidden`
  - css나 스타일을 통해서 설정한다.
  - 해당 엘리먼트가 사라지긴 하지만 블록이나 인라인 설정은 유지되기 때문에 그냥 하얀 공백으로 보일 뿐
  - 상태 변화를 통해서 

3. CSS: Clip Trick
 - css 설정을 통해 엘리먼트를 viewport밖으로 밀어내는 것
  ```css
  element {
 position: fixed;
  width: 1px;
  height: 1px;
  top: -1px;
 left: -1px;
 }
 ```
  - viewport밖에 있기에 보이지는 않지만, 이 경우에는 보조도구에 검색이 된다.
  - 내용이 검색이 되야하거나 보조 도구를 통해 선택지나 액션을 해야하는 경우에 사용된다.
    
4. VUE: `v-if`
  - vue에 해당하는 내용으로 `v-if`를 통해서 렌더의 유무를 정할 수 있다.
  - CSR(client_side_rendering)이므로 `display: none`과 같이 보조도구를 사용하거나 검색이 되야하는 부분에는 사용 하지 않는 것이 좋다.
  - 렌더 자체를 하지 않는 것이지 때문에 상태 변화 (숨기고 보이고)를 자주하지 않는 경우에 사용하면 초기 렌더 부담을 줄일 수 있다.