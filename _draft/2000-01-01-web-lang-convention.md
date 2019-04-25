---
layout: post
title: Markup Convention  
tags: [frontend, css, html]
---



# HTML


#### DOCTYPE (ref.1, ref.4)
> `<!doctype html>`
- 모든 HTML 페이지 시작 지점에 공백 없이 HTML5 문서 타입을 선언

#### 언어(lang) 속성 (ref.1)
> `<html lang="ko">`
- 영어: `en`
- 한국어: `ko`
- 일본어: `ja`

#### 인코딩 설정
```html
<head>
    <meta charset="UTF-8">
</head>
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
- h1: 서비스명
- h2: 메인메뉴, 본문, 이용약관 등
- h3: 세부 컨텐츠, 핵심 컨텐츠 등
- h4: 서브 컨텐츠
- h5, h6: 가급적 사용 하지 않음

#### 들여쓰기 (ref.1, ref.4)
- 탭 1 = 공백 4

#### 속성선언 순서 (ref.1)
1. 선택자로 사용하는 `id`, `class` 속성은 가장 앞에 선언
2. 콘텐츠를 설명하는 `alt`, `title`, `role`, `aria-*` 속성은 가장 뒤에 선언s

# CSS










## 참고 사례
1. [레진 마크업 가이드](https://github.com/lezhin/markup-guide/)
2. [네이버 웹 표준 HTML 마크업 가이드](https://webmastertool.naver.com/guide/basic_markup.naver)
3. [네이버 웹 표준 최적화 기본 가이드](https://webmastertool.naver.com/guide/basic_optimize.naver#chapter2.1)
4. [다음 다룸](http://darum.daum.net/)
5. [NHN coding convention](https://nuli.navercorp.com/sharing/fe/coding)