---
layout: post
title: whats new with chrome and the web 
categories: [web]
tags: [web, chrome]
---

###### 아래의 내용은 [chromium blog의 포스트](https://blog.chromium.org/2019/05/google-io-2019-whats-new-with-chrome.html?m=1)를 제 깜냥대로 번역한 것입니다
___
<br>
<br>

## 크롬과 웹은 무엇이 새로워 졌나?


<iframe width="560" height="315" src="https://www.youtube.com/embed/rUUazNIZW7I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


웹은 올해로 30주년을 맞이했으며 지난 3번의 10년이 지날 동안 많은 놀라움들이 있었다.
우리는 단순한 하이퍼텍스트 문서부터 방대하고, 수준있는 그리고 역동적인 경험을 디자인의 최전선에서 만날 수 있었다.

앞으로, 세상은 계속 발전을 요구할 것이고, 이러한 요구는 우리가 계속 미래의 요구에 플랫폼을 적응하고 발전시킬
글로벌 웹 커뮤니티에 참여할 동기를 부여해 줄것이다. 우리는 웹을 더 빠르고 강력하게 만드는 것에 집중하고 있으며,
전면과 중심에서 유저의 신뢰를 얻고 안전하게 만드는 것도 계속해 나갈 것이다. 
 
 
#### 인스턴트 웹에 대한 비전

웹에서 속도는 중요한 요소다.
[우리는 유저가 로딩 스피드에 굉장히 민감하며 이는 비즈니스에 직접적인 영향을 준다는 것을 알 수 있다.](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-site-speed-importance/)

그래서 우리는 개발자들이 더 경험할 수 있게 브라우저를 빠르고 가볍게 만드려고 노력했다.
스타트업 보틀넷에 집중하면, 우리는 로우-엔드 디바이스에서 크롬의 스타트업을 로딩 스피드를 50% 더 빠르게 발전시킬수 있었다;
전체 디바이스에서는 10%를 빠르게 할 수 있었다. 우리는 또한 V8을 통한 스크롤링 퍼포먼스를 18% 더 향상 시켰고,
실제 앱 구동에서의 자바스크립트 메모리 사용을 20%이상 줄였다.

이러한 효율성의 증가를 떠나서, 우리는 개발자의 짐을 덜 기능을 플랫폼에 추가햇다.

* 대형 이미지 로딩을 위해서 더이상 개발자는 자신만의 자바스크립트 솔루션이 필요 없다. 브라우져는 이미지와 아이프레임을 로딩하는데
 직접적으로 [레이지 로딩](https://addyosmani.com/blog/lazy-loading/)을 사용한다. 모든 개발자는 그저 단순한 HTML 속성을 
 추가하면되고 나머지는 크롬이 알아서 해준다.

* For fast sites, Chrome’s eager clearing of the page,
 when a user wants to navigate to another page, can be detrimental to the experience. 
 로딩시의 이러한 공백의 플래시를 피하기 위해, 우리는 새롭고 실험적인 [Paint Holding](https://youtu.be/3k1I_zA1SEg)을 사용한다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3k1I_zA1SEg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

네비게이션 이야기가 나와서 말인데, [Portals](https://web.dev/hands-on-portals)은 우리가 믿는,
 유저의 웹 휭단의 근본을 바꿀 새로운 웹 기술이다.
 포탈은 아이프레임과 비슷하고 페이지에 컨텐트를 직접적으로 주입하는걸 허락한다. 그러나 표준의 아이프레임과 다르게, 
 포탈은 'activated' 탑-레벨 페이지에서 존재할 수 있으며 인스턴스 트랜지션이 웹을 가로질러 가능하다. 
 진보된 경험은 오리지날 페이지의 UI의 조각을 privately 그리고 안전하게 잡아둘수 있으며,
 그래서 당신은 우리의 원본 모델의 이상적인 상태를 유지하는 심리스 오버레이를 제공할 수 있다.
 
I/O에서, 우리는 우리의 비전을 나누었다. 이 비전은 개발자들이 포탈을 어떻게 하면 사용할 수 있게 하는가
 그리고 API을 사용해서 프리-페칭을 지원하는 것,
 사이트 간의 진보된 트랜지션과 문잭적인 정보의 교환을 이야기한다.
 그리고 포탈 API는 크롬 카나리에서 사용 가능하고 우리는 이 새 primitive를 사용하여 개발자들이 빌드할 것들을 기대하고
흥미진진하게 바라보고 있다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RAtuBSfqCjU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

우리가 특별히 흥미진진해하는 또다른 기술은 [웹 패키징](https://github.com/WICG/webpackage)이다. 
이는 웹 개발자와 웹 서버 간의 새롭고 대담한 연결 방식이다.
웹 패키징으로, 페이지를 로딩하는 모델 원본 서버의 페이지를 브라우저가 요청하는 것에서 어디서나 로드할 수 있는 것으로 바뀌게 된다.
잠재적으인 다른 디바이스에서조차 말이다.

<img src="https://lh6.googleusercontent.com/n6lWJFxp7RqGt2HalG6-pHCDlGSUso1EHRGzpWP8CZRQ9jmfn18XwbxtUcaFvA5AwcyygTzp_sUu-UTgukCd8C-BTjpyytfyIpiAWuVD7sSuIlbQjeVqNH4ZbqWaqObfpr6cHw_S">

이를 통해 브라우저는 컨텐츠를 미리로드하고 페이지를로드 할 수있는 유연성을 제공하면서 프라이버시를 보호합니다.
 이 비전의 첫 단계인 [Signed Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges)는
  지금 개발자들을 위해 크롬에서 사용 가능합니다.
 
이는 웹을보다 즉각적으로 만들기 위해 수행하고있는 작업 중 일부이지만 
개발자의 경험을 빠르게하고 성능을 유지하는 데 성공합니다.
 그래서 우리는 도움이되는 도구를 추가했습니다.
 
2017 년 Google은 개발자가 실제 측정 항목을 제공하여 사용자가 
웹 페이지를 실제로 경험 한 방식을 더 잘 이해할 수 있도록 [Chrome UX 보고서](https://web.dev/chrome-ux-report)를 출시했습니다.
 보고서에는 이제 [Google 검색 콘솔](https://search.google.com/search-console/about)의 최신 속도 보고서를 포함하여 거의 6 백만 개가
  넘는 원 데이터 세트가 포함되어 있으며 Google 도구의 많은 기능을 강화하고 있습니다.
   이 보고서는 현재 베타 버전으로 제공되며 여기에 등록하여 프로그램에 참여하고 의견을 공유 할 수 있습니다.
   
Firebase 팀은 개발자들에게 실제 측정 기준을 더욱 넓게 제공하기
 위해 [성능 모니터링 도구](https://firebase.google.com/docs/perf-mon)를 웹 응용 프로그램도 포함하도록 확장했습니다.
 
그리고 성능을 위한 레일을 계속 사용하기 위해 많은 상위 사이트가 빌드 환경 내에서
 '성능 예산'을 구현하는 것을 보았습니다.
  그래서 [Lighthouse에 직접 성능 예산](https://developers.google.com/web/tools/lighthouse/audits/budgets)을 세우면
  누군가 당신의 프로덕션 사이트를 공격하기 이전에 성능 회귀에 대한 경고를 받을 수 있다.
 
#### 더 강력한 웹을 만들자

Google의 비전은 사용자가 웹에서 원하는 모든 것을 할 수있게하는 것입니다.
 따라서 우리는 작년에 걸쳐 귀하의 경험을 사용자에게 더 가깝게 
 만드는 기능에 중점을 두어 기능 격차를 줄이기 위해 열심히 노력했습니다.
 
가장 중요하고 긴급한 요구 사항을 해결하기 위해 커뮤니티와 긴밀히 협력하면서 
이러한 기능 중 많은 부분을 빠른 속도로 실현하고 있습니다. 

가장 흥미로운 기능 중 하나는 파일 시스템 액세스,
 무제한 할당량 및 SMS 기반 인증 기능입니다.
 이 기능은 "일회용 암호"가 인증 프로세스의 중요한 부분 인 시장에서 일하는 개발자에게 특히 중요합니다.
 
우리는 여기에서 계속 추진력을 발휘하면서 이미 앱을 네이티브 시스템 공유에
 통합 할 수있게 해주는 Web Share Target API를 시작했으며 I / O에서 
 시작한 Web Perception 툴킷과 같은 경험을 가능하게하는 Shape Detection API를 열었습니다. 오늘 오. 
 이 툴킷을 통해 개발자는 모바일 카메라와 통합하여 사람들이 웹 사이트를보다 효과적으로 사용할 수 있습니다.
모바일은 이러한 강력한 기능을 많이 갖추고 있기 때문에 
고품질의 웹 환경을 구축 한 개발자가 더 많은 잠재 고객을 확보 할 수 있기를 바랍니다. 
그래서 우리는 개발자가 자신의 웹 컨텐트를 Android 앱에 통합 할 수있는 
신뢰할 수있는 웹 활동을 시작했습니다. 

인도 최대의 경제적 인 호텔 네트워크 인 OYO Rooms와 같은 기업들은 
이미 신뢰할 수있는 웹 활동을 사용하여 라이트 업 버전을 제공하고 있습니다.
 이는 일부 시장의 파트너들에게 공통적으로 나타나는 패턴입니다.



#### 투명성!, 선택과 조절





#### 개발 경험을 증진시키기
 
 
 