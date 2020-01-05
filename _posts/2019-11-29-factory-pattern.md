---
layout: post
title: Factory_pattern  (TWIL)
categories: [JS]
tags: [mysql, database, html, moment, js]
---

### [Factory](https://refactoring.guru/design-patterns/factory-method)

공장. 무슨 공장?! 클래스 공장

- 공장(수퍼클래스)은 클래스를 만들고 클래스는 객체를 만든다
- 공장(수퍼클래스)은 객체를 만드는 인터페이스를 제공
    - 클래스가 생성 될 객체의 유형을 변경할 수 있다
    - 원하는 유형의 객체를 얻을 수 있는 클래스의 인터페이스를 제공하는 공장(슈퍼클래스)
- 공장은 빵틀을 만들고 빵틀은 빵을 만든다
    - 빵틀은 붕어빵틀, 소라빵틀, 게빵틀 등등...
    - 빵은 붕어빵1, 붕어빵2... 붕어빵n


#### [간단한 js 팩토리](https://velog.io/@ashnamuh/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Factory-%ED%8C%A8%ED%84%B4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

```js
class Cat {}

class Lion {}

const animalFactory = (type) => {
  switch(type) {
    case 'Lion':
      return new Lion()

    case 'Cat':
      return new Cat()

    default:
      throw new Error('Invalid type!')
    }
}

const cat = animalFactory('Cat')
const lion = animalFactory('Lion')
```

### 어디에 쓰면 될까?

1. 객체의 정확한 유형과 종속성을 미리 알 수 없다
    - 공장은 빵틀과 빵을 분리한다. 그래서 빵틀의 종류를 늘리기 쉽다.
1. 라이브러리/프레임 워크 사용자에게 내부 구성 요소(클래스-빵틀)을 확장 하는 방법을 제공
1. 시스템 자원을 아끼기 위해; 매번 새로 만들지 않고 존재하는 객체를 다시 사용하기
    - ... 근데 프로토타입 언어인 JS가 아니더라도 공유 부분(빵틀)에 대해서 메모리 공유가 되든가?!

### 장단점

#### 장점

- 클래스와 객체간의 긴밀한 연결을 피할 수 있다
- 단일 책임 원칙
    - 제품 작성 코드(클래스)를 따로 분리한다
- 개방/폐쇄 원칙
    - 기존 클라이언트 코드(공장)를 손상시키지 않고 새로운 유형(새 클래스)의 객체를 만들 수 있다.

#### 단점

- 새롭고 많은 서브_클래스(빵틀)
    - 기존 생산_클래스(공장)에 패턴을 적용할 때 정도가 제일 좋다?!

