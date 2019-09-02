---
layout: post
title: Nativescript-vue (TWIL)
categories: [app]
tags: [app, frontend, hybrid, nativescript, vue]
---


### [Intro](https://nativescript-vue.org/ko/docs/introduction/)

#### Nativescript
 - NativeScript는 자바스크립트로 실제 네이티브 모바일 어플리케이션을 만들기 위한 오픈소스 프레임워크입니다.
 
#### Vue
 - 사용자 인터페이스를 만들기 위한 진보적인 프레임워크입니다. 핵심 라이브러리는 뷰 계층(view layer)에 집중하고 있고 다른 라이브러리나 기존의 프로젝트와의 통합이 매우 쉽습니다.
 
#### Nativescript-Vue
 - NativeScript-Vue는 Vue.js 를 이용해 모바일 어플리케이션을 만들도록 도와주는 네이티브-스크립트 플러그인입니다. 이미 Vue.js를 사용해 보신 분이라면 NativeScript-Vue가 집처럼 편한하게 느끼실 겁니다.

```
$ $ npm install -g @vue/cli @vue/cli-init
$ vue init nativescript-vue/vue-cli-template <project-name>
$ cd <project-name>
$ npm install
```

```
$ npm run watch:<platform>
```

`<platform>: ios | android`

#### [Nativescript Playground](https://nativescript-vue.org/ko/docs/getting-started/quick-start/)

- native-script를 보다 쉽게 경험해 보기 위한 페이지
- 코드를 작성하고 QR 코드를 native-script 앱에서 인식하면, native-script-preview 앱에서 시연할 수 있다.




### Install


#### [NS set up](https://docs.nativescript.org/start/ns-setup-os-x)
#### ns-vue set up
 - `$ npm install -g nativescript`
 - `tns`
     - native-script 명령문
     - `tns preview` 등이 있음



### Add-Ons

#### [Nativescript Template](https://nativescript-vue.org/ko/docs/getting-started/templates/)
#### [Nativescript Plugin](https://nativescript-vue.org/ko/docs/getting-started/nativescript-plugins/)
#### [Vue Plugin](https://nativescript-vue.org/ko/docs/getting-started/vue-plugins/)





### [Routing](https://medium.com/@pdipax/manual-routing-on-nativescript-vue-part-one-bc97bca2536a)




### Utilities

#### v-template 
#### [v-view directive](https://nativescript-vue.org/ko/docs/utilities/v-view/)

### Elements

#### layout
- 화면을 구성하는 layout
- 엘리먼트들은 모두 layout안에서 인식된다.

#### action-bar
- ios의 상단에서 상태를 보여주는 native 바

#### components
- 화면의 요소들

#### dialogs
- 경고창, 확인창과 같은 dialog

