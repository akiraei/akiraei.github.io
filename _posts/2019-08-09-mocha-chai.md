---
layout: post
title: Mocha, Chai (TWIL)
categories: [programming]
tags: [programming]
---


### [BDD, TDD, DDD](https://asfirstalways.tistory.com/296)

#### TDD
 - 짧은 사이클의 반복에 의존하는 개발 프로세스
 - 자동화된 테스트 케이스를 작성, 테이스를 통과하는 '뛰어난' 코드를 작성
 - 테스트 작성이 코드 개발의 선행이 되며 주도가 되는 개발
 
 
#### BDD
 - TDD에서 파생된 개발 프로세스
 - 테스트 케이스 자체가 요구사양이 되도록 하는 개발 방식
 - BDD는 유닛 테스트 + 테스트 케이스 문서 뿐만 아니라 결합테스트와 시나리오 테스트까지 작성/대체한다.

#### DDD
 - 도메인 그 자체와 도메인 로직에 초점을 맞춤
 - 데이터 중심의 접근에서 순수한 도메인 모델/로직에 집중
 - 도메인 전문가와 소프트웨어 개발자 간의 단일화된 언어체계를 구축

### Mocha

 - BDD를 위한 라이브러리

#### describe

#### it






### [Assertion](https://ko.wikipedia.org/wiki/%ED%91%9C%EB%AA%85)

 - 프로그램 안에 추가하는 '참', '거짓'을 미리 가정하는 문
 - 개발자는 해당 문이 그 문의 장소에서 언제나 참이라고 간주한다.
 - 런타임 중, assertion이 거짓으로 평가되면 assertion failure를 초래
    - 실행이 중단됨
    


### Chai
 - assertion 라이브러리
 - 3가지 형태의 assertion 가능
     - assert: node.js 기본형
     - expect: BDD 스타일 assertion. assertion을 제공하는 시작점으로 함수를 제공.
     - should: BDD 스타일 assertion.  `Object.prototype`을 확장해서 getter를 제공, 이것을 시작점으로 제공한다.


#### expect
 - .ok
 - .deep
 - .include
 - .have
 - .to
 - .equal