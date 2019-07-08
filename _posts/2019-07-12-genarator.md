---
layout: post
title: Generator (TWIL)
categories: [javascript]
tags: [javascript]
---

### Generator
 
 `generator`와 이에 관련된 것들을 알아보자


#### [generator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator)

- `generator` 객체는 `function*`에서 반환된 값
- 반복자와 반복자 프로토콜을 준수
- methods
    - `next()`: 차례에 해당하는 `yield` 값을 반환
    - `return()`: 주어진 값을 반환하고 `generator`를 종료
    - `throw()`: `generator`로 에러를 `throw`한다.
   

#### [yeild](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield)

- `function*`을 중지하거나 재개하는데 사용됨.
- 실질적으로 `IteratorResult` 객체를 반환한다. 
    - `.value`: 실행 결과값
    - `.done`: `generator`가 완전히 종료되었는지를 알려주는 boolean 값 
    - `generator`가 종료되면 `.value`는 `undefined`, `.done`은 `true`
- [`yeild*`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield*): `generator`나 `iterable` 객체에 `yield`를 위임할 때 사용
    - 구문이 아닌 표현. 따라서 값으로 평가됨.
    - 피연산자를 반복하고 반환되는 값을 `yield`로 처리
    - 이에 대한 값은 `iterator`가 종료될 때 반환되는 값
    
    ```js
    function* g1() {
      yield 2;
      yield 3;
      yield 4;
    }
    
    function* g2() {
      yield 1;
      yield* g1();
      yield 5;
    }
    
    var iterator = g2();
    
    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: 3, done: false }
    console.log(iterator.next()); // { value: 4, done: false }
    console.log(iterator.next()); // { value: 5, done: false }
    console.log(iterator.next()); // { value: undefined, done: true }
    
    ```
    ```js
    function* g3() {
      yield* [1, 2];
      yield* "34";
      yield* Array.from(arguments);
    }
    
    var iterator = g3(5, 6);
    
    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: "3", done: false }
    console.log(iterator.next()); // { value: "4", done: false }
    console.log(iterator.next()); // { value: 5, done: false }
    console.log(iterator.next()); // { value: 6, done: false }
    console.log(iterator.next()); // { value: undefined, done: true }
    ```
    ```js
    function* g4() {
      yield* [1, 2, 3];
      return "foo";
    }
    
    var result;
    
    function* g5() {
      result = yield* g4();
    }
    
    var iterator = g5();
    
    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: 3, done: false }
    console.log(iterator.next()); // { value: undefined, done: true }, 
                                  // g4() 는 여기서
                                  //{ value: "foo", done: true }를 반환합니다
    console.log(result);          // "foo"
    ```






#### [symbol.iterator](https://poiemaweb.com/es6-symbol)

- `symbol`
    - 변경 불가능한 원시 타입
    - 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용
    - `Symbol()` 함수에는 문자열을 인자로 전달할 수 있다.
        - 문자열은 `Symbol` 생성에 영향을 주지 않는다.
        - 생성된 `Symbol`에 대한 설명으로 주로 디버기에 사용
    - `Symbol` 객체의 프로퍼티 중에 `length`와 `prototype`을 제외한 프로퍼티를 `Well-Known Symbol`이라 부른다.

- `symbol.iterator`
    - 자바스크립트 엔진은 `Well-Known Symbol`을 참조하여 일정한 처리를 한다.
        -  예를 들어 어떤 객체가 `Symbol.iterator`를 `key`로 사용한 메소드 가지고 있으면 
    자바스크립트 엔진은 이 객체가 `이터레이션 프로토콜`을 따르는 것으로 간주하고 이터레이터로 동작하도록 한다.
    - `Built in Iterable`
        1. Array
        2. String
        3. Map
        4. Set
        5. DOM data structures
        6. arguments
        7. TypedArray
     


#### [iteration protocol](https://poiemaweb.com/es6-iteration-for-of)

- iteration protocol
    - 데이터 컬렉션을 순회하기 위한 프로토콜(미리 약속된 규칙)이다. 
    - iterable과 iterator가 있다.
    
- `iterable`
    - `iterable`은 `for…of` 문에서 순회할 수 있으며 `Spread` 연산자의 피연산자로 사용할 수 있다.

- `iterator`
    - `next` 메소드를 소유
         - `next` 메소드를 호출하면 `iterable`을 순회
         - `next`는 `iterable`의 각 요소를 순회하기 위한 포인터의 역할
         - return `iterator` result object which has property for `value` and `done`

- iteration protocol의 필요성
    - iterable은 데이터 공급자의 역할을 한다.
    - 다양한 데이터 소스에 동일한 프로토콜을 지원
        - 효율성 향상
        - 데이터 소비자와 데이터 소스를 연결하는 인터페이
 

<!--
5. next
6. for of

* set
* map
* week map
* typedArray
-->