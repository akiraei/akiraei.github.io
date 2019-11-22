---
layout: post
title: Expression, Statement, Ternary operator (TWIL)
categories: [JS]
tags: [js]
---

### 문제의식

express.js 실행시
```js
a ? b : throw 'err call' // err 발생 ('err call'). 구동 불가
if(a){b;}else{throw 'err call'} // 구동 됨
```

왜?!


### [삼항연산자](https://stackoverflow.com/questions/13503086/why-is-this-ternary-operator-invalid-in-js)

> javascript distinguishes between statements and expressions.
> The ternary operator only handles expressions; **throw is a statement**.

즉, 표현식만 다루는 삼항연산자에 선언식을 넣었으니 err가 호출됨.

### [선언과 표현](https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/)

자바스크립트에는 선언식과 표현식이 있다.

#### 선언식

호이스팅에 영향을 받는다
- throw는 선언식이기 때문에 호이스팅에 영향을 받는다.

#### 표현식

호이스팅에 영향을 받지 않는다
- 클로저로 사용 가능
- 콜백으로 사용 가능 (다른 함수의 인자로 넘길 수 있음)
