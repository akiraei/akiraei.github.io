---
layout: post
title: Wep-app-manifest (TWIL)
categories: [app, web]
tags: [app, frontend, hybrid, web]
---

[웹-앱-매니페스트](https://developers.google.com/web/fundamentals/web-app-manifest)는 간단한 JSON 파일이다.
이 것은 당신의 웹 어플리케이션에 대해서 이야기한다. 그리고 당신의 모바일 디바이스에서 어떻게 행동해야 되는지를 말해준다.


평범한 매니페스트 파일은 `name`, `icons`, `start_url`의 정보를 반드시 포함한다.


###  Create the manifest

```json
 {
   "short_name": "Maps",
   "name": "Google Maps",
   "icons": [
     {
       "src": "/images/icons-192.png",
       "type": "image/png",
       "sizes": "192x192"
     },
     {
       "src": "/images/icons-512.png",
       "type": "image/png",
       "sizes": "512x512"
     }
   ],
   "start_url": "/maps/?source=pwa",
   "background_color": "#3367D6",
   "display": "standalone",
   "scope": "/maps/",
   "theme_color": "#3367D6"
 }
 ```
 
 
 ### 브라우저에게 매니페스트를 이야기 해주기
 
 ```html
<link rel="manifest" href="/manifest.json">
 ``` 
- 매니페스트 요청은 자격 증명없이 이루어 지므로 (같은 도메인에 있더라도) 매니페스트에 자격 증명이 필요한 경우 매니페스트 태그에 `crossorigin = "use-credentials"`를 포함 해야한다. 
 
 
### Key manifest properties
 
#### short_name , name

웹앱의 이름을 표기. `short_name`은 홈 스크린에 사용하기에 `name`이 너무 길 때 사용된다.

#### icons

웹 앱이 홈 스크린에 더해 질 때 사용될 아이콘을 지정 가능

#### start_url

웹앱이 시작될 URL을 지정한다.

#### background_color

splash screen 기능을 사용할 때 사용됨.

#### display

앱을 시작할 때 표시되는 브라우저 UI를 사용자 지정할 수 있다.
예를 들어 주소 표시 줄과 브라우저 크롬을 숨길 수 있다.
또는 앱이 게임이라면 완전한 전체 화면으로 설정 할 수 있다.


#### orientation

화면을 특정 방향으로 설정 가능하다.

#### scope

브라우저가 앱 내에 있다고 간주하는 URL 집합을 정의. 또한 사용자가 앱을 떠난 시점을 결정.
 스코프는 웹앱의 모든 진입 점과 종료점을 포함하는 URL 구조를 제어. 따라서 `start_url`은 범위 내에 있어야 한다.

#### theme_color

tool bar의 색을 설정할 수 있다. 태스크 스위쳐의 앱 프리뷰에 반영된다.


### Splash screens


앱이 처음 시작되면 브라우저가 시작되고 초기 콘텐츠가 렌더링을 시작하는 데 약간의 시간이 걸린다.
앱이 정지 된 것처럼 사용자가 인식할 수도 있는 흰색 화면을 보여주는 대신 Chrome은 첫 번째 화면이 표시 될 때까지 스플래시 화면을 표시할 수도 있다.
Chrome은 다음을 속성을 참고하여 매니페스트 속성에서 스플래시 화면을 자동으로 만든다.

1. name
1. background_color
1. icons

 - 스플래시 화면에서 앱으로 부드럽게 전환되려면 `background_color`가 로드될 페이지(첫번째 페이지)와 동일한 색상이어야 한다.
