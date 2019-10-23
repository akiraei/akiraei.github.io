---
layout: post
title: moment.js-input\[type=date\]-e.target.valueAsDate-MYSQL (TWIL)
categories: [JS]
tags: [mysql, database, html, moment, js]
---

### Issue

- MYSQL에 존재하는 data를 불러오고 싶다. MYSQL은 date에 UTC를 사용한다.
- 프론트에서 조작한 다음 생성일을 필터하고 싶다.
- 불편을 피하고자 moment.js를 사용하려고 한다.
- `<input type="date"/>`을 사용하고 값은 e.target.valueAsDate로 받는다.
- **그런데 어떻게 해도 프론트에서 설정한 날짜에 맞는 data를 조회 할 수 없다!** 


### \<input type="date"\/> and e.target.valueAsDate

`<input type="date"/>`를 사용하면 date를 선택할 수 있는 UI를 사용할 수 있다.
그리고 이를 조절하면서 `e.target.valueAsDate`를 쓰면 Date 객체로 받을 수 있다.
```html
<input type="date"/>

<script>
const input = document.querySelector('input')
input.addEventListener('change', e => e.value.valueAsDate)
</script>
```
그리고 한국의 브라우져에서는 대충 이렇게 나온다.
```
Wed Oct 20 2020 00:00:00 GMT+0900 (한국 표준시)
```
그런데 문제는.... `<input>`에서 선택한 날짜를 UTC로 본다는 것이다.
즉 10월 21일을 선택하면  `KRT 10월 21일 00:00`이 아니라 
`UTC 10월 21일 00:00` => `KRT 10월 21일 09:00`이된다.

### Hack with moment.js

그래서 moment.js를 사용해 hack을 해보려고 한다.
일단 받은 `UTC 10월 21일 00:00`를 string으로 변환한다.
```js
const browserDateString = moment(e.target.valueAsDate).utc().format('YYYY-MM-DD HH:mm:ss')
```
그러면 UTC로 출발했지만 실제로는 우리가 선택한 '한국날짜(시각)'에 맞춘 string을 구할 수 있다.
이 string으로 Date 객체를 만들자. 이 때 자동으로 지역시간으로 변환된다. (적어도 난 그랬다.)
```js
const localDate = new Date(browserDateString)
```
그러면 저 `localDate`는 `KRT 10월 21일 00:00`가 된다.
마지막으로 이를 MYSQL이 쓰는 UTC에 맞게 변환하자
```js
const utcDateString = moment(localDate).utc().format('YYYY-MM-DD HH:mm:ss')
```
`utcDateString`이라는 이름을 가진 string을 얻을 수 있다.