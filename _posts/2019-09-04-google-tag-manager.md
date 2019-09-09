---
layout: post
title: Google Tag Manager
categories: [database]
tags: [database, bigdata, front-end, back-end]
---



### GTM

- 개발자의 도움 없이 이벤트 핸들러를 달아서 사용할 수 있는... 툴?!
- 코드 제네레이터
- 마케터 친화적인 도구


### bna

#### before GTM
- event_handler

#### after GTM
- custom_html_tag


### GTM Diagram

- account: 계정
    - container: 채널이나 구분 대상
        - tag: 특정 시점에 특정 정보를 보내는 객체
            - trigger: 시점을 결정
                - variable: 정보를 결정... 하기 보다는 그냥 자주쓰는 변수를 미리 세팅해 놓는거 같은데?
            
- Data_layer
    - 계속 나와서 중요한건 알겠는데 도대체 정체가 뭐지
    - 큐 같긴 한데 이걸 어떻게 뭐 한다는거야
    - 소스 까야 하나
    - 전달하려는 데이터를 보관하는 객체
        - 말은 쉽지
        - `window.dataLayer`라고? .... 
        
        

### submit

- submit이 없으면 실제로 적용이 되지 않는다
    - 뭐야 ... 왜 이렇게 만들었을까
    - 설정하는데 너무 지진해서 힘들까봐 그런거구나... 이해가 된다 막
    



### preview mode; process
 
1. page view
1. DOM ready
1. Window Loaded
1. \[events\]
    - 이벤트 들은 `이벤트 이름`으로 볼수 없다; 태그 매니저에서
    - 속성이나 다른 요소들로 `이벤트 이름`을 유추할 뿐


    

### Interaction Hit

- 상호작용 조회
- Bounce?!



### event

#### ga

- result of event action
- endpoint

#### gtm

- event action
- action description



### Measurement plan

- 아니 이게 얼마나 중요한데 이걸 이야기 하지 않고 넘어가는 건가?!
- 이걸 개발자가 알아 먹을 수만 있으면 태그 달 때 드럽게 편할텐데
- 왜 이걸 넘어가는건가 설명해 달라고!!!!!



### element visibility

- element가 viewport에서 보여졌는지?


### structured data

- json-ld 포맷의 태그
- ...?! 무엇을 위해?!
- reference가 있다고?
- SEO 관련된거 구나....
- `<head>`의 `<meta>`가 priority가 더 높긴 하다.
- 로봇의 파싱 에러가 있기에 강제로 structured data를 입력하는 script가 필요하다.
- Google Search Console이 더 정확한다.
    - 그게 뭔데?!
    



### virtual pageview

- 웹페이지 이동 요청이 없는데 페이지 뷰(이벤트)를 발생시키는 것
- 페이지 새로고침 없이 양식이 제출될때
- 한 페이지에서 변화하는 동적인 페이지(탭전환, 케러셀 등)
- 클릭(just_link) 이벤트를 이용하면서 `wait for tag`를 걸어서 사용한다
- 실은 잘 모르겠다. 
    - gtag를 쓰는게 더 알맞는거 같은데... 
    - 결과적으로는 SPA의 ROUTING과는 전혀 연동 안되는 방법 같다. 
    - VIRTUAL PAGEVIEW가 아니라 VIRTUAL EVENT ACTION이라는 느낌.
