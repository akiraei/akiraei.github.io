---
layout: post
title:  리액트 고급 가이드 -  Refs and the DOM
tags: [frontend, react]
---
###### 아래의 내용은 react의 공식 문서를 제 깜냥대로 번역한 것입니다
___
<br>
<br>

## 개요

 Refs는 DOM 노드나 렌더 메소드로 생성된 리액트 요소에 접근할 수 있는 방법을 제공한다.
 전형적인 리액트 데이터 흐름에서는, props가 부모와 자식요소간의 interact를 하기 위한 유일한 방법이다.
  자식을 modify하기 위해서는 새로운 props로 re-render해야 한다.
   그러나 일반적인 데이터 흐름 외부의 자식을 수정해야하는 경우가 있다.
    modify 되야하는 자식은 리액트 컴포넌트의 instance일 수 있으며, 혹은 DOM element일 수 있다. 
    이러한 2 케이스를 위해서, 리액트는 escape hatch를 제공한다.


## 언제 refs를 사용하는가

 몇몇 좋은 refs의 사용 케이스가 있다.
- focus 관리, text 선택, media playback
- 회피 불가능한 애니메이션의 triggering
- 3th 파티 DOM librareis와 통합함?!
 예를 들어, Dialog 컴포넌트의 `open()`과 `close()`라는 메소드를 노출하는 것 보다, `isOpen` prop을 넘기는 것이 있다.



## Refs를 남용하지 말 것


 첫 번 째 경향은 "make things happen"으로 앱 안에서 refs를 사용하는 것이다.
  이 경우 잠시 시간을내어 구성 요소 계층에서 상태를 소유해야하는 위치에 대해 더 비판적으로 생각하라.
   종종, 상태를 소유하기에는 더 높은 레벨의 hierarchy가 더 좋은 위치라는 것이 분명해 진다. 
 lifting state up 가이드를 확인해 보아라. 아니면 우리에겐 리덕스가 있다.


## Refs 생성

 Refs는 `React.createRef()`로 생성되며 `ref` attribute를 통해 리액트 요소에 붙게 된다.
  refs는 보통 일시적인 property로 컴포넌트가 생성될 때 배정된다. 그래서 그들은 컴포넌트를 넘어서 reference가 될 수 있다.


```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
```

## Refs로 접속하기
 render 안의 요소로 ref가 전달될 때, 노드의 reference는 ref의 current attribute에서 접속 가능하게 된다?!
```js
const node = this.myRef.current;
```
 refs의 값은 노드의 유형에 따라 달라진다.:

- `ref` attribute가 HTML 요소에서 사용될 때, constructor 안에서 `React.createRef()`으로 생성된
 ref는 그 것의 current property와 같은 underlying DOM 요소를 받는다.
- `ref` attribute가 custom class component일 때, ref 객체는
 그 것의 current와 같은 커포넌트의 mounted instance를 받는다 
- `ref` attribute를 function components에서 사용하지 말 것.
 왜냐하면 function components는 instance가 존재하지 않기 때문이다.


## DOM 요소에 ref 추가하기


이 코드는 ref를 DOM node의 레퍼런스를 저장하기 위해서 사용했다:


```js
 class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM 요소를 저장하기 위해서 ref를 만든다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // text input을 향한 명시적인 focus - raw DOM API 사용
    // Note: 우리는 DOM node를 얻기 위해 current에 접속함  
    this.textInput.current.focus();
  }

  render() {
    // 리액트에게 우리는 <input> ref와 우리가 constructor에서 생성한 'textInput'를 associate하고 싶다고 말하다.
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

 리액트는 컴포넌트가 마운트 될 때 current property를 DOM 요소와 결합한다.
  그리고 unmount 될 때는 null과 다시 결합 시킨다.
   ref는 `componentDidMount`나 `componentDidUpdate`라는 라이프 사이클 메소드가 발생하기 전에 업데이트한다.


## 클래스 컴포넌트에 ref 추가하기

 위의 CustomTextInput 컴포넌트를 래핑하여 마운트 직후에 클릭 한 상태로 
 시뮬레이션하려는 경우 ref를 사용하여 CustomTextInput에 액세스하고 해당 
 focusTextInput 메서드를 수동으로 호출 할 수 있습니다.


```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
````


## 함수 컴포넌트와 refs

ref attribute를 함수 컴포넌트에서 사용하지 말 것
왜냐면 그들은 인스턴스가 없기 때문이다

```js
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    // 이 것은 작동하지 않을 것!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

 ref를 사용하고 싶다면 라이프 사이클 메소드나 스태이트를 사용할 때 처럼 컴포넌트를 클래스로 바꾸어야 한다.
 그러나, 함수 컴포넌트 안에서 ref attribute를 사용할 수 는 있다. DOM 요소나 클래스 컴포넌트를 refer한다면 말이다.

```js
function CustomTextInput(props) {
  // textInput은 이 곳에서 명명되어야 한다. 그래야 ref가 textInput을 refer 할 수 있다.
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

> 참조: 리액트 16.3 공식 문서 영문판
