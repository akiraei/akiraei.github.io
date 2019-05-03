---
layout: post
title:  리액트 고급 가이드 - Forwarding Refs 
tags: [frontend, react]
---
###### 아래의 내용은 react의 공식 문서를 제 깜냥대로 번역한 것입니다
___
<br>
<br>


## 개요

Ref forwarding은  ref를 컴포넌트를 통과해서 자식에게로 자동으로 넘기는 기술이다.
재사용되는 컴포넌트 라이브러리들에게 유용하다.

## DOM 컴포넌트에게 Forwarding refs

```js
function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  );
}
```

 React 컴포넌트는 렌더링 된 결과를 포함하여 구현 세부 정보를 숨긴다. 
 FancyButton을 사용하는 다른 컴포넌트는 일반적으로 내부 button DOM element에 대한 ref를 가져올 필요가 없다.
  컴포넌트가 서로의 DOM 구조에 너무 많이 의존하지 않기 때문에 좋다.
 그러한 encapsulation은 FeedStory나 Comment 같은 application-level components에 바람직함에도 불구하고,
  FancyButton 이나 MyTextInput과 같은 매우 많이 재사용될 수 있는 'leaf' 컴포넌트에 그것은 불편할 수 있다.
   이러한 컴포넌트는 일반 DOM button 및 input과 비슷한 방식으로 응용 프로그램 전체에서 
   사용되는 경향이 있으며 DOM 노드에 액세스하면 포커스, 선택 또는 애니메이션을 관리해야한다.
ref forwarding은 일부 컴포넌트가 수신 한 ref를 받아 하위 단계로 전달 (즉 전달) 할 수있는 선택 기능이다.

 아래 예제에서 FancyButton은 React.forwardRef를 사용하여 전달 된 ref를 가져온 다음 렌더링 한 DOM 버튼으로 전달한다.

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 이제 ref를 DOM button으로 직접적으로 가져올 수 있다.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

이렇게하면 FancyButton을 사용하는 컴포넌트가 기본 버튼 DOM 노드에 대한 ref를 가져올 수 있으며 
필요한 경우 DOM 버튼을 직접 사용한 것처럼 사용할 수 있다.

다음은 위의 예에서 일어나는 일에 대한 단계별 설명이다.


우리는 React.createRef를 호출하여 Refact ref를 만들고 이를 ref 변수에 할당한다.
우리의 ref를 JSX attribute로 지정하여 <FancyButton ref = {ref}>로 전달한다.
React는 ref를 두 번째 argument로 forwardRef 내의 (props, ref) => ... 함수로 전달한다.
이를 JSX attribute로 지정하여 이 ref argument를 <button ref = {ref}>로 전달한다.
ref가 첨부되면 ref.current는 <button> DOM 노드를 가리킨다.


NOTE

두 번째 ref argumnet는 React.forwardRef 호출로 component를 정의 할 때만 존재한다. regular function 또는 클래스 component는 ref argument를 받지 못하고 ref는 props 에서도 사용할 수 없다.

Ref 전달은 DOM component에만 국한되지 않는다. class component instance에 대한 ref도 전달할 수 있다.







Forwarding refs in higher-order components

function logProps(WrappedComponent) {

  class LogProps extends React.Component {

    componentDidUpdate(prevProps) {

      console.log('old props:', prevProps);

      console.log('new props:', this.props);

    }



    render() {

      return <WrappedComponent {...this.props} />;

    }

  }



  return LogProps;

}



"logProps"HOC은 모든 props을 랩핑하는 컴포넌트로 전달하므로 렌더링 된 output은 동일하다. 예를 들어,이 HOC를 사용하여 "fancy button" 컴포넌트에 전달 된 모든 props을 기록 할 수 있다.



class FancyButton extends React.Component {

  focus() {

    // ...

  }



  // ...

}



// FancyButton을 exporting하기 보다 우리는 LogProps를 export한다.

// FancyButton을 렌더링한다.

export default logProps(FancyButton);



위의 예에 한 가지 주의 할 점이 있다. ref는 전달되지 않는다. 이것은 ref가 props가 아니기 때문이다. key처럼 React가 다르게 처리한다. HOC에 ref를 추가하면 ref가 래핑 된 컴포넌트가 아닌 가장 바깥 쪽 컨테이너 컴포넌트를 참조하게 된다.



즉, FancyButton 컴포넌트에 대한 ref가 LogProps 컴포넌트에 실제로 첨부됩니다.



import FancyButton from './FancyButton';



const ref = React.createRef();



// The FancyButton component we imported is the LogProps HOC.

// Even though the rendered output will be the same,

// Our ref will point to LogProps instead of the inner FancyButton component!

// This means we can't call e.g. ref.current.focus()

<FancyButton

  label="Click Me"

  handleClick={handleClick}

  ref={ref}

/>;



다행스럽게도 React.forwardRef API를 사용하여 내부 FancyButton 컴포넌트로 Refs를 명시 적으로 전달할 수 있다. React.forwardRef는 props 및 ref parameter를 수신하고 React 노드를 반환하는 렌더링 함수를 허용한다. 예 :



function logProps(Component) {

  class LogProps extends React.Component {

    componentDidUpdate(prevProps) {

      console.log('old props:', prevProps);

      console.log('new props:', this.props);

    }



    render() {

      const {forwardedRef, ...rest} = this.props;



      // custom prop "forwardedRef" 를 ref로 결합

      return <Component ref={forwardedRef} {...rest} />;

    }

  }



  // second param "ref"이  React.forwardRef에 의해 제공됨을 주의하라.

  // LogProps에 regular props으로 전달할 수 있다, e.g. "forwardedRef"

  // 그런 다음 Component에 연결할 수 있다.

  return React.forwardRef((props, ref) => {

    return <LogProps {...props} forwardedRef={ref} />;

  });

}







Note for component library maintainers



 컴포넌트 라이브러리에서 forwardRef를 사용하기 시작하면 이를 주요 변경 사항으로 간주하고 라이브러리의 새 주요 버전을 릴리스 해야한다. 이것은 라이브러리가 다른 행동(예 : 어떤 ref가 무엇과 결합이 되는지, 그리고 어떠한 유형으로 export되는지)을 할 수 있기 때문이며, 이로 인해 이전 동작에 의존하는 앱 및 기타 라이브러리가 손상 될 수 있기 때문이다.

 React.forwardRef가있을 때 조건부로 적용하는 것도 같은 이유로 권장되지 않는다. 즉, 라이브러리가 작동하는 방식을 변경하고 React 자체를 업그레이드 할 때 사용자의 앱을 손상시킬 수 있다.








