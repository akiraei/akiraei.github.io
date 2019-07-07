---
layout: post
title: GCP load balancing (TWIL)
categories: [server]
tags: [backend, server, http]
---

### [HTTP/HTTPS load balancing](https://reoim.tistory.com/m/51)

#### Load Balancing
  - server cluster에 traffic을 분산
  - server status check (health check)

#### HTTP 

 - `Layer` (Layer 7 of OSI model)
 - one Anycast IP address를 제공
   - 여러 region의 모든 Backend를 한 ip로 접근 가능
   - HTTP: 80, 8080 / HTTP: 443
   - IPv4, IPv6
   - Auto-scaling by Managed instance group
 - Premium Network Tier
 
 
 | step no. | name | (+) | content |
 |:--|--:|--:|--:|
 |1st| internet | | send request |
 |2nd| Global Forwarding Rule | | deliver request |
 |3rd| Target Proxy | url map | request와 url map과 비교. backend를 결정하고 forwarding |
 |4th| Backend Service | BE Instance Group | serving capacity, instance health check을 고려해서 적절한 backend로 request를 보냄
 
> - managed instance group을 사용하면 auto-scaling 기능 활성화
> - balancing mode
>   - region에 request가 초과하면 가장 가까운 region으로 traffic 이동
   
#### HTTPS
 - 기본적으로는 동일
 - Target Http Proxy 대신 Target Https Proxy를 사용
 - 하나 이상의 SSL certification이 proxy에 설치되어야 함
   
#### Cloud Armor
 - DDoS 방어
 - Blacklist와 Whitelist를 설정
   
#### Cloud CDN
 - local cache server
 -  HTTP(S) LB 설정 시 체크박스 클릭 한번으로 설정 가능
    - Web site load time이 크게 향상
    - band width cost 절약 
    - contents 가용성 향상
 - premium network tier
 

