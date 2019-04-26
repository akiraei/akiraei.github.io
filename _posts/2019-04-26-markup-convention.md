---
layout: post
title: Markup Convention  
tags: [frontend, css, html, markup]
---



## HTML


#### DOCTYPE (ref.1, ref.4)
```html
 <!doctype html>
```
- 모든 HTML 페이지 시작 지점에 공백 없이 HTML5 문서 타입을 선언

#### 언어(lang) 속성 (ref.1)
```html
 <html lang="ko">
```
- 영어: `en`
- 한국어: `ko`
- 일본어: `ja`

#### 인코딩 설정 (ref.1)
```html
<head>
    <meta charset="UTF-8">
</head>
```

#### IE 호환모드 설정 (ref.1)
```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

#### CSS, Javascript 삽입 (ref.1)
- `type` 속성을 생략
```html
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css">

<!-- In-document CSS -->
<style> ... </style>

<!-- JavaScript -->
<script src="code-guide.js"></script>
```

#### Boolean 속성 (ref.1)
- 불리언 속성의 값은 지정하지 않는다.
```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
<option value="1" selected>1</option>
```

#### 문서개요-HTML5 아웃라인 (ref.1)
- 섹셔닝 요소와 헤딩 요소를 이용해 문서 개용를 논리적으로 구성
- 섹셔닝 요소 (`section`, `article`, `nav`, `aside`)에는 헤딩 요소를 명시적으로 사용
- `h1` 요소를 한 페이지에 한 번만 사용
  ```html
  <!-- Bad HTML -->
  <body>
      <h1>동물</h1>
      <div>
          <h1>포유류</h1>
          <div>
              <h1>고래</h1>
          </div>
      </div>
  </body>
  
  <!-- Good HTML -->
  <body>
      <h1>동물<h1>
      <article>
          <h2>포유류<h2>
          <section>
              <h3>고래<h3>
          </section>
      </article>
  </body>
  ```


#### 문서 제목 (ref.4)
> `컨텐츠 제목 (공백) - (공백) 하위섹션명 (공백) | (공백) 서비스명`

- 서비스명
  - www, online-class, school, career
- 컨텐츠 제목
  - 데이터사이언스, 크리에이티브, 파이낸스, AOP, ONLINE
- 하위 섹션명
  - category, course, format
  - 비필수 요

#### 색인 (ref.4)
- `h1`: 서비스명
- `h2`: 메인메뉴, 본문, 이용약관 등
- `h3`: 세부 컨텐츠, 핵심 컨텐츠 등
- `h4`: 서브 컨텐츠
- `h5`, `h6`: 가급적 사용 하지 않음

#### 들여쓰기 (ref.1, ref.4)
- 탭 1 = 공백 4

#### 속성선언 순서 (ref.1)
1. 선택자로 사용하는 `id`, `class` 속성은 가장 앞에 선언
2. 콘텐츠를 설명하는 `alt`, `title`, `role`, `aria-*` 속성은 가장 뒤에 선언s






## CSS

#### CSS 문법 (ref.1)

- 들여쓰기 (ref.1, ref.4)
  - 탭 1 = 공백 4
  - 탭 사용하지 않음

-  선택자 그룹핑
  ```css
  /* X */
  .selector1, .selector2 { ... }
  
  /* O */
  .selector1,
  .selector2 { ... }
  ```

- 속성값에 홑따옴표(`''`)
  ```css
  /* X */
  [type=text] { ... }
  [type="text"] { ... }
  { background: url(ex.png); }
  { background: url("ex.png"); }
  
  /* O: 속성 선택자 속성값에 홑따옴표 사용 */
  [type='text'] { ... }
  
  /* O: CSS 속성값에 홑따옴표 사용 */
  { background: url('ex.png'); }
  ```
  
- 한줄에 하나의 속성, 마지막은 `;`
  ```css
  /* 속성이 하나 뿐이라면 한 줄에 작성합니다. 여는 중괄호({) 좌우로 하나의 공백, 닫는 중괄호(}) 왼쪽에 하나의 공백을 포함합니다. */
  .selector { property: value; }
  
  /* 속성이 둘 이상이라면 속성 기준으로 줄바꿈합니다. 여는 중괄호({) 뒤에서 줄바꿈하고, 닫는 중괄호(})는 새로운 줄에 놓습니다. */
  .selector {
      property: value;
      property: value;
  }
  
  /* 여는 중괄호({) 앞에는 항상 공백 하나를 포함합니다. */
  /* 콜론(:) 뒤에는 항상 공백 하나를 포함합니다. */
  ```
- 속상값 쉼표(`,`)뒤에 공백 또는 줄바꿈
  ```css
  /* 속성값이 길지 않은 경우 한 줄에 표현 */
      { box-shadow: 1px 1px 1px #ccc, -1px -1px 1px #000; }
  
  /* 속성값이 길면 여러 줄에 표현 */
      {
          background-image:
              url('//cdn.lezhin.com/assets/images/header.png'),
              url('//cdn.lezhin.com/assets/images/footer.png');
      }
  ``` 
- 괄호(`()`)안에서는 쉼표(`,`)뒤에 공백을 넣지 않습니다.
   ```html
  /* X */
      color: rgba(0, 0, 0, .5);
  
  /* O */
      color: rgba(0,0,0,.5);
  ```
  - **공백을 넣는게 좋을 것 같은데**
- 축약 가능한 값을 축약합니다.
  ```html
  /* X */
      color: #ffffff;
      font-weight: normal;
      font-weight: bold;
      border: none;
      opacity: 0.5;
      border-width: 0px;
      background-size: 100% auto;
      background-position: 50% 50%;
  
  /* O */
      color: #fff;
      font-weight: 400;
      font-weight: 700;
      border: 0;
      opacity: .5;
      border-width: 0;
      background-size: 100%;
      background-position: 50%;
  ```
  - **축약을 못하게 하는게 더 나을 것 같은데...**

#### 속성(property) 선언 순서 (ref.1)
- 포지셔닝과 박스모델 관련 속성을 가장 먼저 작성하고 나머지는 뒤에 놓는다.
  ```css
  {
  /* Positioning */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
  /* Box-model */
      display: block;
      float: right;
      flex: 1;
      width: 100px;
      height: 100px;
  /* Typography */
      font: normal 13px "Helvetica Neue", sans-serif;
      line-height: 1.5;
      color: #333;
      text-align: center;
  /* Background */
      background-color: #f5f5f5;
  /* Border */
      border: 1px solid #e5e5e5;
      border-radius: 3px;
  /* etc */
      opacity: 1;
  }
  ```
  
#### 미디어 쿼리 위치 (ref.1)
- 미디어쿼리는 관련 규칙이 있는 자리에 모아 놓는다.
  ```css
  .element { ... }
  .element-avatar { ... }
  .element-selected { ... }
  @media (min-width: 640px) {
      .element { ... }
      .element-avatar { ... }
      .element-selected { ... }
  }
  ```
  
#### 전처리문 계산식 (ref.1)
- 계산식에 괄호를 사용합니다.
  ```css
  /* Bad example */
  .element { margin: 10px 0 @variable*2 10px; }
  
  /* Good example */
  .element { margin: 10px 0 (@variable * 2) 10px; }

  ```
  
#### 클래스 작명 (ref.1)
- BEM 스타일
- 카멜케이스, 숫자, 더블 대시(`--`), 더블 언더스코어 (`__`)만 사용
  - modifier에만 대시(`-`)를 사용한다던가... 카멜대신 스네이크를쓴다던가....


#### 선택자 (ref.1)
- 클래스 선택자만을 사용
- 여러 클래스를 묶을 때 쉼표 후 개행
- 선택자 조합과 중첩을 사용하지 않는다. 선택자 우선순위를 높여 이해하기 어렵게 한다.
  ```css
  /* Bad example */
  section.tweet > header { ... }
  section.tweet > header.tweet__header { ... }
  .tweet > .tweet__header, .tweet > .tweet__username { ... }
  
  /* Good example */
  .tweet { ... }
  .tweet__header,
  .tweet__username { ... }

  ```
  
#### 단위 사용 (ref.4)
- 단위 사용은 다양한 환경의 크로스플랫폼을 위해 절대단위(`px`)를 권장하며, 유동적인 레이아웃 구현 시 상대단위(`em`, `%`)를 사용한다.

#### z-index (ref.4)
- 간격은 10단위로
- 페이지 단위에서는 1000을 넘지 않도록
- 팝업레이어는 1000부터 시작


## 참고 사례
1. [레진 마크업 가이드](https://github.com/lezhin/markup-guide/)
2. [네이버 웹 표준 HTML 마크업 가이드](https://webmastertool.naver.com/guide/basic_markup.naver)
3. [네이버 웹 표준 최적화 기본 가이드](https://webmastertool.naver.com/guide/basic_optimize.naver#chapter2.1)
4. [다음 다룸](http://darum.daum.net/)
5. [NHN coding convention](https://nuli.navercorp.com/sharing/fe/coding)