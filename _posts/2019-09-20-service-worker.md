---
layout: post
title: Service Worker (TWIL)
categories: [app, web]
tags: [app, frontend, hybrid, web]
---

[서비스 워커](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)는 브라우저, 네트워크와 웹 어플리케이션 사이의 프록시 서버와 같은 필수적인 역할을 한다.
 - 효과적인 오프라인 경험을 생성
 - 네트워크 요청을 가로채기
 - 네트워크가 사용 가능한지 여부에 따라 적절한 조치를 취하기
 - 서버에 있는 자산을 업데이트
그 들은 또한 '푸시 노티'와 '백그라운드 싱크 API'에 접속하도록 해준다.


### 서비스 워커 컨셉과 사용

서비스 워커는 이벤트-드리븐 워커이다. 오리진과 패스에 대해 등록된다.
서비스 워커는 자바스크립트 파일이다. 웹페이지/사이트를 조절할 수 잇따. 
 - intercepting and modifying navigation and resource requests
 - caching resources
 - most obvious one beign when the network is not available.
 

서비스 워커는 워커 컨텍스트에서 실행된다. 그래서 DOM에 접속할 수 없다.
메인 자바스크립트와 다른 쓰레드에서 실행되기에 블락킹하지 않는다.
서비스 워커는 완벽히 비동기를 위해 디자인됐다. 따라서 동기 XHR이나 로컬스토리지를 사용하는 API는 서비스 워커에서 사용할 수 없다.


서비스 워커는 HTTPS에서만 작동 된다. 보안상의 이유로.
중간자 공격은 항상 피해햐 한다. 파이어폭스에서 개인정보-보호-브라우저-상태일 때는 HTTPS라도 서비스워커가 작동하지 않는다.


#### Register

 - `ServiceWorkerContainer.register()`
 - 성공하면 서비스 워커가 클라이언트로 다운로드 
 - origin이나 subset 안에서 실행된다.
 
 #### 다운로드, 설치 그리고 활성
 
 1. Download
 1. Install
 1. Activate
 는 ServiceWorker의 생명주기이다.
 
서비스 워커는 사용자가 서비스 워커 제어 사이트 / 페이지에 처음 액세스 할 때 즉시 다운로드. 
24시간 마다 다운도르 됨. 설정을 통해 더 자주 할 수 있다.


다운로드 한 파일이 기존 서비스 워커와 다르거나 페이지/사이트에서 처음 발견 한 서비스 워커와 다른 새 파일일 경우 설치를 시도한다.

사용 가능한 기존 서비스 작업자가 있는 경우에는 새 서비스 워커가 백그라운드에 설치되었지만 아직 활성화되지 않음.
이 시점에서 이 서비스 워커를 '대기중인 워커'라고함.
이전 서비스 워커를 여전히 사용중인 페이지가 더 이상 로드되지 않게 되면 활성화되고 새 서비스 워커가 활성(활성 작업자가 됨).
`ServiceWorkerGlobalScope.skipWaiting()`을 사용하여 활성화를 더 빨리 수행 할 수 있으며 `Clients.claim()`을 사용하여 활성 작업자가 기존 페이지를 청구 할 수도 있음ㄴ.


다음은 서비스 워커의 이벤트들이다.
 - `InstallEvent`
     - 내장 스토리지 API를 사용
     - 캐시를 작성
     - 앱을 오프라인으로 실행하려는 자산을 배치
     - 서비스 워커가 이를 실행할 때 사용하도록 준비

 - `ActivateEvent`
     - 이 이벤트가 실행될 때, 이전의 캐시와 기존의 서비스 워커와 연결된 것들을 정리할 수 있다.

 - `FetchEvent`
     - 요청에 응답 할 수 있음
     - `FetchEvent.respondWith`


### 다른 사용 사례

 - 백그라운드 데이터 동기화
 - 다른 출처의 리소스 요청에 응답
 - 지리적 위치 또는 자이로 스코프
 - 개발 목적으로 CoffeeScript, less, CJS / AMD 모듈 등의 클라이언트 측 컴파일 및 종속성 관리
 - 백그라운드 서비스 후크
 - 특정 URL 패턴을 기반으로 한 맞춤 템플릿
 - 사진 앨범의 다음 몇 장의 사진과 같이 가까운 미래에 사용자가 필요로하는 리소스를 미리 가져오기