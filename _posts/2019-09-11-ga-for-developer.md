---
layout: post
title: Google Analytics for Developer (TWIL)
categories: [database]
tags: [database, bigdata, front-end, back-end]
---

이전 시간까지 GA에 대해서 공부했다. 
그런데 안내된 내용들이 '마케터'들을 위해서 설명되어 있어서 개발자인 입장에서는 이해하기 힘들고, 
마케팅-개발을 연결하기 힘들었다. 
다음은 내가 이에 대해 이해하기 위해서 공부한 내용들이다.


### gtag

별로 어렵지 않다. 문서보고 그냥 채우면 될 거 같은데... 
오히려 template에 어떻게 잘 적용하는 지를 고민하는게 더 낫지 않을까.


### utm_XXX

#### caveat

1. `실시간 보고서`에서 utm_XXX는 바로 적용이 되지 않는다. 하루?가 지난 뒤에 `행동`에서 확인 할 수 있다.


### [전환](http://analyticsmarketing.co.kr/digital-analytics/google-analytics-basics/2411/)

#### Google Ads

- Google Ads의 전환과 GA의 전환은 바라보는 목표가 다르다. 
광고 효율을 확인하기 위해서는 Google Ads가 필요하고 따라서 Google Ads 계정이 필요하다.
- 전환은 비지니스, 업종, 상황에 따라 상이하고 표시되는 방식도 다르기에 별도의 설정을 해야 한다.
- 웹분석 프로세스
    1. **목표설정; GA**
    1. 측정
    1. 보고
    1. 분석
    1. 최적화
- 전환 액션; Google Ads
    - 이벤트 스니펫



#### GA; 목표설정

목표설정을 하지 않으면 GA에서 전환이 추적되지 않는다. 일단 목표설정 부터 해야한다. GA에서 관리 -> 보기 -> 목표에서 확인할 수 있다.

1. 목표설정
    - 템플릿을 사용하면 사전에 지정된 정보로 시작하여 더 깔금하게 볼 수 있지만 지정된 정보 포맷과 사이트 정보를 맞추어야 하는 불편이 있다.
    - 맞춤 설정은 비교적 간단하게 설정이 가능하지만 세밀하지는 못하다.
    
1. 목표설명
    - 도착, 시간, 세션당 페이지수, 이벤트 중 선택 가능 

1. 목표 세부정보
    - 목표 세부정보는 도착, 시간, 세션당 페이지수, 이벤트에 따라서 설정하는 것이 다르다.
    - 도착
        - 최종목표는 목표설명에서 설정한 행동이 실행될 페이지를 의미한다.
        - 유입경로는 해당 유입경로로 들어온 것만이 전환 행동을 실행하는 것을 의미한다. funnel 분석에 사용된다.
    - 시간
    - 세션당 페이지수
    - 이벤트
    


#### [Google Ads; gtag 설정](https://support.google.com/google-ads/answer/7548399?hl=ko)

1. 페이지에 GA 분석을 위하 gtag가 이미 삽입되어 있는 경우

    ``` html
    
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID">   </script>
    
      <script>
      window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'GA_TRACKING_ID');
      gtag('config','AW-CONVERSION_ID');
     </script>

    ```

1. 이벤트 스니펫 추가
    - 페이지 로드로 할 것인지 클릭으로 할 것 인지 정한다.
    - 아래는 페이지 로드일 경우
    ``` js
      gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/AW-CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'USD'
      });
    ``` 

1. 사례
    - GA 분석 gtag가 이미 존재
    - 페이지 로드시 이벤트 실행
    
     ``` html
     
       <!-- Global site tag (gtag.js) - Google Analytics -->
       <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID">   </script>
     
       <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'GA_TRACKING_ID');
         gtag('config','AW-CONVERSION_ID');
         gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/AW-CONVERSION_LABEL',
             'value': 1.0,
             'currency': 'USD'
           });
       </script>
  
      ```  

- **문제**
    - GA에서는 목표설정을 통해서 전환이 잡힌다.
    - 그런데 Google Ads에서는 태그를 통한 전환을 어디를 통해서 잡는거지?
    - 대시보드? 보고서? 어디서 확인 가능한가?


    