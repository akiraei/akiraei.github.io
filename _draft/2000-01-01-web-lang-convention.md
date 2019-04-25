---
layout: post
title: Markup Convention  
tags: [frontend, css, html]
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








## 참고 사례
1. [레진 마크업 가이드](https://github.com/lezhin/markup-guide/)
2. [네이버 웹 표준 HTML 마크업 가이드](https://webmastertool.naver.com/guide/basic_markup.naver)
3. [네이버 웹 표준 최적화 기본 가이드](https://webmastertool.naver.com/guide/basic_optimize.naver#chapter2.1)
4. [다음 다룸](http://darum.daum.net/)
5. [NHN coding convention](https://nuli.navercorp.com/sharing/fe/coding)