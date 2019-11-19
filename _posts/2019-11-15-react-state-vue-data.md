---
layout: post
title: react state vue data (TWIL)
categories: [frontend]
tags: [frontend, vue, react]
---

### 문제 의식

vue의 data는 직접적인 접근이 가능하다. 

```vue
this.$data.array.push('something') // non error
```

하지만 react의 state는 직접적인 접근이 불가능하다.

```react
this.state.array.push('something')  // error

this.setState({array: this.state.array.concat('something')})
```


### [vue data](https://medium.com/@erwinousy/%EB%82%9C-react%EC%99%80-vue%EC%97%90%EC%84%9C-%EC%99%84%EC%A0%84%ED%9E%88-%EA%B0%99%EC%9D%80-%EC%95%B1%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8B%A4-%EC%9D%B4%EA%B2%83%EC%9D%80-%EA%B7%B8-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%B4%EB%8B%A4-5cffcbfe287f)

vue는 data가 업데이트 할 때마다 react의 setState와 같은 작업을 알아서 처리해줌. 
왜 react는 setState가 필요할까?

Revanth Kumar 왈
> react에서는 
> 1. componentWillReceiveProps
> 1. shouldComponentUpdate
> 1. componentWillUpdate
> 1. render
> 1. componentDidUpdate
> 라이프 사이클이 state를 변경 할 때마다 다시 실행됨. 그런데 setState를 쓰면 변경된 state가 뭔지
> 직접적으로 알 수 있고 state를 바꿀 때마다 저 많은 라이프 사이클 훅이 필요하지 않으니 리소스가 줄어듬.
> 즉 필수 사항은 아니고 권장 사항.


[그렇다면 vue는?](https://kr.vuejs.org/v2/guide/instance.html)

vue는 data가 변경되면 

1. beforeUpdate
1. updated

로 끝나게 된다. 리액트에 비해 3단계가 적다. 
**이 때문인지 모르겠는데 직접적으로 변경해도 괜찮은 걸까?**

1. 일단 data의 properties는 proxy 처리된다.
1. 그리고 observe 되면서 data가 변경되면 라이프 사이클 훅이 도는 듯
1. 정말 단계가 적어서 setState와 같은 함수가 필요 없는 건가?!

