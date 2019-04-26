---
layout: post
title:  리액트 고급 가이드 - Portals
tags: [frontend, react]
---
###### 아래의 내용은 react의 공식 문서를 제 깜냥대로 번역한 것입니다
___
<br>
<br>

### 개괄

Portals은 DOM 안으로 부모 컴포넌트의 DOM 하이어라키 밖에 존재하는 자식들을 렌더하는데 
first-class 방식을 제공한다.
**-> 무슨 소리냐**
> `ReactDOM.createPortal(chlid, container)`

첫 번째 argument child는 렌더 가능한 리액트 자식 요소 중 아무 거나 이다.
 두 번째 argument container는 DOM 요소이다.


### 사용

보통, 컴포넌트의 렌더 메소드를 통해 요소를 반환할 때, 요소는 제일 가까운 부모 요소의 자식과 
같은 DOM의 안으로 마운트 된다.

```js
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```
그러나, 때때로 자식을 다른 위치의 DOM 안으로 넣는 것은 유용하다
```js
render() {
  // 리액트는 새로운 div를 생성하지 않는다. 이것은 'domNode'안으로 자식을 렌더한다.
  // 'domNode'는 어떤 유효한 DOM node이며 DOM 안의 위치와 관계가 없다
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```
포탈은 부모 컴포넌트가 overflow: hidden 이나 z-index의 스타일을 가지고 있으나
 자식요소를 시각적으로 부모로 부터 'break out'하기 위할 때 전형적으로 사용한다.
예를 들어 dialogs, hovercards, tooltips가 있다.


### Portals의 Event Bubbling

 Portal이 DOM의 어느 위치에 존재할 수 있다지만, Portal은 다른 어떤 보통의 리액트 자식요소처럼 행동한다. 
 컨텍스트와 같은 기능은 DOM 트리의 위치에 관계없이 포털이 여전히 React 트리에 있으므로 포털인지
  여부에 관계없이 정확히 동일하게 작동한다. 이 것은 이벤트 버블링을 포함한다. 포탈 안에서 시동된 
  이벤트는 리액트 트리 안에 함유된 조상에게 전파하는데 비록 이러한 요소가 DOM 트리 안의
   조상이 아니더라 전파한다. html 구조를 가정해본다.
```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```
`#app-root` 안의 부모 컴포넌트는 `#modal-root`의 형제 노드 출신인 uncaught, bubbling event 를 잡는 것이 가능하다?!


```js
// 이 두 컨테이너는 DOM안에서 형제이다.

const appRoot = document.getElementById('app-root')
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // 포탈 요소는 모달의 자식이 마운트 된 후 DOM 트리에 삽입됩니다. 
    //즉, 자식 노드는 분리 된 DOM 노드에 마운트됩니다.
    // 예를 들어 DOM 노드를 측정하거나 자손에서 'autoFocus'를 사용하는 것처럼
     //자식 구성 요소를 DOM 트리에 즉시 연결해야하는 경우 State을 Modal에 추가하고 
     //Modal이 DOM 트리에 삽입 될 때만 자식을 렌더링합니다 .
    modalRoot.appendChild(this.el);
  }


  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 비록 버튼이 DOM안에서 직접적인 후손요소가 아니라 하더라도
    //자식의 버튼이 클릭 되었을 때, 부모의 상태가 업데이트 되었을 때, 이 것은 시동을 건다.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // 이 버튼의 클릭 이벤트는 부모로 올라간다. 왜냐하면 정의된 'onClick' attribute가 없기 때문이다.
  return 
    <div className="modal">
      <button>Click</button>
    </div>
  );


ReactDOM.render(<Parent />, appRoot);
```

포탈에서 시작한 이벤트 버블링을 부모 컴포넌트에서 잡는 것은 더 유연한, 
포털에 본질적으로 의존하지 않는 추상화의 개발을 가능하게 한다. 예를 들어, 
만약 <Modal />을 렌더한다면, 부모는 포털을 사용하여 구현되었는지 여부에 관계없이 해당 이벤트를 잡을 수 있다.


> 참조: 리액트 16.3 공식 문서 영문판