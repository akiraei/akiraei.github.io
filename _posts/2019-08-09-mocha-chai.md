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

### [Mocha](https://mochajs.org/)

 - BDD를 위한 라이브러리

#### Run cycle overview

```
run 'mocha spec.js'
|
spawn child process
|
|--------------> inside child process
  process and apply options
  |
  run spec file/s
  |
  |--------------> per spec file
    suite callbacks (e.g., 'describe')
    |
    'before' root-level pre-hook
    |
    'before' pre-hook
    |
    |--------------> per test
      'beforeEach' root-level pre-hook
      |
      'beforeEach' pre-hook
      |
      test callbacks (e.g., 'it')
      |
      'afterEach' post-hook
      |
      'afterEach' root-level post-hook
    |<-------------- per test end
    |
    'after' post-hook
    |
    'after' root-level post-hooks
  |<-------------- per spec file end
|<-------------- inside child process end

```


#### describe

 - 테스트 코드의 시작. parameter로 첫번째는 테스트 단위의 이름, 두번째는 함수를 받는다.
 - describe 안에 또 다른 describe가 있을 수 있다.

#### it

 - describe 안에서 목적으로 실행되는 부분.
 - 첫번째 parameter로 이름을 받고, 두번째 parameter로 실행될 함수를 받는다.
 - 두번째 parameter의 함수에서 assertion을 실행한다.

#### hooks
 - 하나의 describe block 내에서, 개별 테스트에 해당하는 describe에 대해서 실행되는 hook(함수)이다. 
 - 첫번째 parameter로 이름을 받고, 두번째 parameter로 함수를 받는다.
 - before: block 내의 모든 테스트들 이전에 실행됨 
 - after: block 내의 모든 테스트들 이후에 실행됨
 - beforeEach: block 내의 모든 테스트들 각자의 이전에 실행됨
 - afterEach: block 내의 모든 테스트들 각자의 이후에 실행됨

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