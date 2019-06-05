---
layout: post
title: vue - 당신이 Nuxt.js를 사용해야하는 10가지 이유
tags: [vue, frontend, backend]
---


###### 아래의 내용은 Derick Sozo의 '10 reasons to use Nuxt.js for your next web application' 을 제 깜냥대로 번역한 글입니다.
___
<br>
<br>



당신이 vue.js 개발자라면 nuxt.js를 들어봤을 것이다.
 그러나 당신은 무엇이 숨어있는지는 모두 알 지 못한다. 
 아마도 묻겠지, "왜 내가 프레임워크를 위한 프레임워크를 써야합니까?". 
 vue는 이미 자바스크립트 앱을 더 쉽게 만들 수 있는 개발 도구다.
 
  도대체 어떤 아이디어가 nuxt.js에게 숨겨져 있을까?



## nuxt.js 무엇?

- nuxt.js는 vue 위에 존재하는 고차원 프레임워크이다.
- nuxt.js는 광범위의 혹은 싱글 페이지 vue 앱을 만드는 것을 간편하게 해준다.
- nuxt.js는 서버나 클리이언트 코드의 배포를 축약한다. 
이러한 역할로 당신은 앱 개발에 더 집중할 수 있다. 

nuxt의 목표는 당신이 메인 프로젝트 베이스에서 좀더 유연성을 갖게 하는 것이다?!
왜냐하면 개발 단계에서 nuxt를 사용하면 어마어마한 기능을 굉장히 작은 용량의 자바스크립트 파일을 추가하는 것에 그치기 때문이다.



### 1. 번거로움없이 범용 앱을 만듭니다.


Nuxt.js의 가장 큰 셀링 포인트 중 하나는 범용 앱을보다 쉽게 ​​만들 수 있다는 것입니다.

> #### 범용 앱이란 무엇입니까?
> 범용 앱은 클라이언트와 서버 측에서 모두 실행할 수있는 JavaScript 코드를 설명하는 데 사용됩니다.
Vue와 같은 많은 최신 JavaScript 프레임 워크는 단일 페이지 응용 프로그램 (SPA)을 작성하는 것을 목표로 합니다. 
기존 웹 사이트에서 SPA를 사용하면 많은 이점이 있습니다. 
예를 들어, 빠르게 업데이트되는 매우 멋진 UI를 작성할 수 있습니다.
 그러나 SPA는 로드 시간이 길어지는 등의 단점이 있으며
  Google은 SEO 목적으로 페이지를 크롤링 할 콘텐츠가 처음부터 없으므로
   이를 해결하기 위해 노력하고 있습니다. 모든 내용은 호출 후에 JavaScript로 생성되기 때문입니다.

범용 앱은 SPA를 실행하기 전에는 그저 빈 `index.html` 페이지입니다. 
때문에 웹 서버에서는 애플리케이션의 로드 속도를 높이기 위해 렌더링 된 HTML을 
모든 경로의 브라우저 요청에 대한 응답으로 전송합니다
 이는 Google이 페이지를 더 쉽게 크롤링하도록 하여 SEO를 향상시킬 수 있습니다.


**Nuxt.js는보다 간단하게 범용 앱을 작성할 수 있도록 도와줍니다.**

서버 측과 클라이언트 측 모두에서 많은 구성을 해야하기 때문에 범용= 프로그램을 작성하는 것은 지루할 수 있습니다.
이것이 Nuxt.js가 Vue 어플리케이션을 위해 해결하고자 하는 문제입니다.
 Nuxt.js를 사용하면 클라이언트와 서버간에 코드를 공유 할 수 있으므로 응용 프로그램의 로직을 세우는데 더 집중할 수 있습니다.

Nuxt.js는 컴포넌트의 `isServer` 및 `isClient`와 같은 속성에 대한 
액세스를 제공하므로 클라이언트와 서버 중, 어디에서  렌더링하는지 쉽게 결정할 수 있습니다. 
또한 서버 측에서 컴포넌트가 의도적으로 렌더링되지 않도록하는 `no-ssr` 컴포넌트와 같은 특수 컴포넌트가 있습니다.

마지막으로, Nuxt는 데이터를 가져 와서 서버 측에서 렌더링하는 데 
사용할 수있는 컴포넌트 내부의 `asyncData` 메소드에 대한 액세스를 제공합니다.


### 2. 서버없이 Vue 앱을 정적으로 렌더링하고 모든 범용 앱의 이점을 얻으십시오.


Nuxt의 가장 큰 혁신은 `Nuxt Generate` 명령과 함께 제공됩니다. 
이 명령은 완전히 정적인 웹 사이트 버전을 생성합니다.
 모든 경로에 대해 HTML을 생성하여 자체 파일로 저장합니다.



예를 들어 다음 페이지가있는 경우:
```
-| pages/
----| about.vue
----| index.vue
```

Nuxt는 다음과 같은 폴더 구조를 생성합니다 :
```
-| dist/
----| about/
------| index.html
----| index.html
```

이를 수행하는 이점은 범용 프로그램의 이점과 매우 유사합니다.
 페이지를 빠르게 로드하고 검색 엔진 및 소셜 미디어 크롤러가 웹 사이트를 크롤링 할 수 있게 해주는 마크 업이 있도록 하는 것 입니다.
차이점은 더 이상 서버가 필요 없다는 것입니다. 모든 것은 개발 단계에서 생성됩니다.
서버가 없어도 범용 렌더링의 이점을 얻을 수 있기 때문에 강력합니다. GitHub Pages 또는 Amazon S3에서 앱을 호스팅 할 수 있습니다.



### 3. 자동 코드 분리 (미리 렌더링 된 페이지)

Nuxt.js는 특별한 Webpack 구성으로 웹 사이트의 정적 버전을 생성 할 수 있습니다.

정적으로 생성 된 각 경로 (페이지)에 대해, 경로는 해당 경로를 실행하는 데 필요한 코드만으로도 자체 JavaScript 파일을 가져옵니다.
이것은 자바 스크립트 파일의 크기를 전체 응용 프로그램의 크기에 비해 상대적으로 작게 유지하므로 속도에 크게 도움이 됩니다.


### 4. 스타터 템플릿과  커맨드 라인을 통해 설치

Nuxt.js는 `starter-template`이라는 초보 템플릿을 제공합니다. 
이 템플릿은 훌륭한 폴더 구조가 조직된 프로젝트를 시작하기 위한 스캐폴딩/간이 구조물을 당신에게 제공합니다

vue-cli가 설치되어 있는지 확인하고 다음 명령을 실행하십시오.
```js
$ vue init nuxt-community/starter-template <project-name>
```
거기에서 응용 프로그램으로 `cd`하고 `npm install`을 실행하면 좋은 결과를 얻을 수 있습니다.


### 5. 기본적으로 훌륭한 프로젝트 구조를 얻으십시오.

많은 작은 Vue 응용 프로그램은 여러 파일들을 가능한 일관된 코드 구조를 직접 관리해야합니다.
 기본 Nuxt.js 응용 프로그램 구조는 이해하기 쉬운 방식으로 응용 프로그램을 구성 할 수있는 좋은 출발점을 제공합니다.


```js
Document
--| layout
----| page
------| default
--------| asyncData
--------| fetch
--------| head
--------| layout
--------| middleware
--------| scrollToTop
--------| transition
--------| validate
------| optional
--------| page_child
--------| Vue_Component + Nuxt option: head
--------| Vue_Component + Nuxt option: head

```

다음과 같은 몇 가지 주요 디렉토리가 있습니다.

- 컴포넌트
  - 개별 Vue 컴포넌트를 구성 할 수있는 폴더입니다.
- layouts
  - 주요 응용 프로그램 레이아웃을 포함 할 폴더입니다.
- 페이지
  - 앱의 경로를 저장할 폴더입니다. Nuxt.js는 이 디렉터리 내의 모든 .vue 파일을 읽고 응용 프로그램 라우터를 만듭니다.
- store
  - 모든 앱의 Vuex Store 파일을 저장할 폴더입니다.


### 6. 당신의 라우트 사이의 트랜지션을 쉽게 설치하십시오

Vue에는 엘리먼트 또는 컴포넌트에서 JavaScript 애니메이션,
 CSS 애니메이션 및 CSS 전환을 쉽게 처리 할 수있는 래퍼 `<transition>` 엘리먼트가 있습니다.
Nuxt.js는 각 페이지가 `<transition>` 엘리먼트에 래핑되는 방식으로
경로를 설정하므로 페이지 간에 간단하게 트랜지션을 만들 수 있습니다.


### 7. 단일 파일 컴포넌트를 손쉽게 작성할 수 있습니다.

많은 소규모 Vue 프로젝트에서 `Vue.component`를 사용하여 컴포넌트를 정의합니다. 

다음, 새로운 `Vue ({el : '#container'})`를 사용하여 모든 페이지 본문에 컨테이너 요소를 대상으로 정의합니다.
이는 JavaScript가 특정한 보여주기를 향상시키는 용도로만 사용되는 소규모 프로젝트에서 효과적입니다.
 그러나 더 큰 프로젝트에서는 관리가 어려워 질 수 있습니다.
이러한 모든 문제는 확장명이 .vue 인 단일 파일 컴포넌트로 해결됩니다.
 이를 위해서는 웹팩과 바벨 같은 도구를 사용하여 빌드 프로세스를 설정해야합니다.
Nuxt.js는 Webpack과 함께 사전 구성되어 제공되므로 복잡한 빌드 프로세스를 직접 설정할 필요없이 .vue 파일을 사용할 수 있습니다.


### 8. 추가 작업없이 ES6 / ES7 컴파일을 수행하십시오.

Webpack과 함께 Nuxt.js는 바벨도 함께 제공됩니다.

 Babel은 ES6 및 ES7과 같은 최신 JavaScript 버전을 
 JavaScript로 컴파일하여 이전 브라우저에서 실행할 수 있습니다.
Nuxt.js는 바벨을 설정하므로 모든 .vue 파일과 ₩<script>₩ 태그 안에 작성한
 모든 ES6 코드는 모든 브라우저에서 작동하는 JavaScript로 컴파일됩니다.


### 9. 쉬운 개발을 위해 자동 업데이트 서버로 설정하십시오.

자동 업데이트 프로세스를 직접 설정하거나 웹 개발자가 익숙한 
`변경 - 새로 고침 - 변경 - 새로 고침` 
프로세스하는 것과 비교할 때, Nuxt.js로 개발하는 것은 쉽습니다. 그저 자동 업데이트 개발 서버로 설정하기만 하면 됩니다.
이러한 .vue 파일을 개발하고 작업하는 동안 Nuxt.js는 Webpack 구성을 사용하여 변경 사항을 확인하고 모든 것을 컴파일합니다.
Nuxt.js 프로젝트에서 `npm run dev` 명령을 실행하면 개발 서버가 설정됩니다.


### 10. Nuxt.js 커뮤니티의 모든 것에 대한 액세스

마지막으로 유용한 라이브러리, 모듈, 스타터 키트 등을 컴파일하여 앱을 더 쉽게 만들 수 있도록
 Nuxt Community라는 GitHub 컬렉션이 있습니다.]
 여기를 통해 필요한 것을 직접 코딩하기 전에 사용할 수 있는지 확인하십시오.


## 모든 것을 요약하면

이러한 모든 기능 덕분에 Vue.js 앱을 훨씬 더 멋진 경험으로 개발할 수 있습니다.
 범용 앱이 필요 없으며 SPA를 고수하고 싶어도 Nuxt.j를 사용하면 여전히 이점이 있습니다.
  vue 파일, ES6 컴파일 및 기타 많은 기능을 통해 프로젝트의 기본 기반이 될 수 있습니다.