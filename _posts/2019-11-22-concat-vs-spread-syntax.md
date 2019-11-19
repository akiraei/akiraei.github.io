---
layout: post
title: concat vs spread syntax (TWIL)
categories: [js]
tags: [js]
---



### [예시](https://stackoverflow.com/questions/48865710/spread-operator-vs-array-concat)

```js
let big = (new Array(1e5)).fill(99);
let i, x;

console.time('concat-big');
for(i = 0; i < 1e2; i++) x = [].concat(big)
console.timeEnd('concat-big');

console.time('spread-big');
for(i = 0; i < 1e2; i++) x = [...big]
console.timeEnd('spread-big');


let a = (new Array(1e3)).fill(99);
let b = (new Array(1e3)).fill(99);
let c = (new Array(1e3)).fill(99);
let d = (new Array(1e3)).fill(99);

console.time('concat-many');
for(i = 0; i < 1e2; i++) x = [1,2,3].concat(a, b, c, d)
console.timeEnd('concat-many');

console.time('spread-many');
for(i = 0; i < 1e2; i++) x = [1,2,3, ...a, ...b, ...c, ...d]
console.timeEnd('spread-many');
```

결과
> concat-big: 62.070ms
>
> spread-big: 53.430ms
>
> concat-many: 1.650ms
>
> spread-many: 19.375ms


### 왜?!

concat은 해당 배열 뒤에 인수를 하나씩 붙임. syntax는 배열 요소를 하나하나 빈 배열에 추가함.
- 근데 잘 모르겠다. 그러면 concat은 해당 배열자체를 건드리....지 않던데?!

```js
const arr1 = [1,1]
const arr2 = [2,2]
const arr3 = arr1.concat(arr2)
console.log(arr1) // [1,1]
console.log(arr3) // [1,1,2,2]
console.log(arr1 === arr3) // false
```

- 그렇다면 새 배열을 배출한다는 건데.... 해당 배열을 '복사' 한 뒤에 인수를 '하나씩' 붙인다는 건가?
    - 그래야나 syntax보다 concat이 빠른거지....
    - **그리고 못 찾겠다 이 현상에 대해서 컬럼을....**
