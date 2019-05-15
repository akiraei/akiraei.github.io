---
layout: post
title: Redux, connect를 이해하기
categories: [redux]
tags: [frontend, backend, redux]
---


리덕스를 배운다

react와 함께 사용하는 방법을 공부 중이다. react의 state를 redux에 옮겨서 사용하면
 single source를 유지하기 용이하기 때문에 매우 훌륭하다고 생각된다.

 다만 react의 state와 redux의 state 저장소인 store는 너무 다른 느낌을 나에게 준다. 
 store는 어떤 서버의 저장소 같은 느낌이다. 실은 redux 자체가 서버와 같은 느낌을 준다.
  reducer를 통해서 schema와 같은 명령을 내려줘야 할 뿐만 아니라 action으로 
  type구분도 해줘야 하니 말이다.

 redux를 이해하는데 많은 고충이 따르지만 제일 힘들었던 것은 dispatch를 
 component에서 어떻게 불러오가 였다. 여러 문서를 뒤져서
  (뒤질 필요도 없이 공식 문서를 보면 됐지만) 확인한 결과 react-redux의 connect가 
  제일 편리한 방법인 것 같다. connect로 component를 export하기 
  전에 씌우면 dispatch가 props로 내려지기 때문에 바로 사용 가능하다.
   그리고 여기서 밝혀지는 나의 오해. dispatch 명령은 즉각적으로 dispatch를
    통한 값을 return하지 않는다! 즉, `dispatch(action, [option]).map`
     같은거 하면 오류가 생김. 다시 차분히 코드를 보니 data를 
     가져오기 위해서는 connect에서 (store의) state를 통해 가져오던가
      혹은 getState로 가져왔어야 하는 것. - **멍청함이 하늘을 찌른다.**

 그러면 이제부터 특정 user가 접근 가능한 data를 시작 할 때 받아오고
  redux의 store에서 관리할 수 있을 것이다. component마다 필요한 data는
   connect에 function을 적용해서 filter를 적용하고  그 뒤에 data를 
   props로 내리면 사용하기 훨씬 편하지 않을까...