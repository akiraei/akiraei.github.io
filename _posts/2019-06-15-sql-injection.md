---
layout: post
title: SQL Injection (TWIL) 
categories: [database]
tags: [backend, database]
---

SQL 인젝션은 코드 인젝션의 기법으로 클라이언트의 입력값으로 데이터베이스를 공격하는 것을 의미한다.
클라이언트의 입력 데이터를 제대로 필터링, 이스케이핑 하지 못했을 때 주로 발생한다.
쉬운 방법에 비해 파괴력이 매우 강력하기 때문에 기초적으로 배우게 되며 매우 큰 주의를 요한다.

SQL 인젝션의 기본원리는 쿼리를 항상 참으로 만드는 것이다. 
SQL 인젝션 공격은 인증 우회, 데이터 노출, 원격 명령어 실행 등을 목적으로 둔다.

### [공격 방법 예시]((https://namu.wiki/w/SQL%20injection))

|:--:|:-------------:|
|id  | admin         |
|pw  | ' OR '1' = '1 |


`SELECT user FROM user_table WHERE id='admin' AND password=''OR'1'='1';`

- WHERE 뒤에 있는 구문은 `false AND false OR true`가 되고 
`AND`가 `OR`보다 먼저 연산되니까 결과적으로 `true`가 되고 패스워드를 몰라도
로그인이 가능하게 된다.


### 방어 방법

- 클라이언트에서 넘어오는 값을 직접 SQL로 넘기지 않는다.
  1. escape 합수
  2. prepared statement
  3. 클라이언트 데이터 필터링
- DB에 클라이언트 별 관리/접근 권한이나 명령어 권한 등을 설정한다.
- 위 방법 모두 사용하는 것이 추천된다

### [공격 방법]((https://jinhyuks.com/2018-08-03/SQL-Injection/))

#### Error based sql injection

쿼리에 고의적 오류를 발생시켜 나오는 에러를 바탕으로 정보를 찾아낸다.

인증 우회를 위해 ID에 `'or 1=1 --;`를 입력한다.

`[DB쿼리실패] SELECT * FROM MEMBER WHERE (userid=''') and (pwdcompare('123123', pwd)=1)`
가 반환된다면

`SELECT * FROM MEMBER WHERE (userid='_____') and (pwdcompare('______', pwd)=1)`
이 로그인 인증 쿼리라는 것을 알 수 있다. 이 쿼리문을 부수면 인증을 우회할 수 있다.

#### [Union Based Sql injection](https://m.blog.naver.com/koromoon/120172851234)

`UNION`은 구조가 같은 두 테이블에 대해서 두개의 쿼리를 합쳐 반환할 때 사용된다. 
이런 특징을 사용하여 데이터 노출을 위해 사용되며 우편번호 찾기, 게시판 같이 데이터를 쉽게 확인할 수 있는 곳에서 악용된다.

우선 테이블 구조를 알아야 한다. 컬럼 수를 확인하기 위해서 `SELECT`나 `ORDER BY`를 사용한다.

```
개포동%' or ETC like %개포동% ORDERY BY 1--;
개포동%' or ETC like %개포동% ORDERY BY 2--;
개포동%' or ETC like %개포동% ORDERY BY 3--;
개포동%' or ETC like %개포동% ORDERY BY 4--;
개포동%' or ETC like %개포동% ORDERY BY 5--;
개포동%' or ETC like %개포동% ORDERY BY 6--;
개포동%' or ETC like %개포동% ORDERY BY 7--;
개포동%' or ETC like %개포동% ORDERY BY 8--; // <- 여기서 에러가 난다. 그렇다면 컬럼 수는 7이다.
```

이제 `개포동%' union all select 1, '222-222', userid, pwd, name, tel, address1 from MEMBER--;`을 통해서
원하는 정보를 `MEMBER` 테이블에서 가져올 수 있다. [물론](https://blog.naver.com/PostView.nhn?blogId=jsky10503&logNo=221370395897&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView) 
1. 테이블 이름이 `MEMBER`인 것을 알아내야 하고
1. `userid`, `pwd`등 컬럼 이름을 알아내야 하고
1. 어떤 컬럼이 실제 값을 출력해서 보여주는지 확인해야 한다.



#### Time based sql injection

Blind Sql injection 중 하나.

`' or sleep(5)--;`

`SLEEP`과 같은 시간 지연 함수를 이용해서 DBMS의 쓰레드를 억류하는 것이다. 이를 통해 서비스가 정지된다.
특히 자동화 툴을 이용할 때 조심해야 하는데, 한번 대량으로 주입된 `SLEEP` 함수로 큰 피해를 입을 수 있다.



#### Boolean Based sql injection

Blind Sql injection 중 하나.

```
' or 1=1 --;
' or 1=2 --;
```

쿼리 결과가 참/거짓에 대해서 웹페이지가 다르게 반응하는 것을 이용한다.
참/거짓에 대한 웹페이지의 반응을 살펴서 공격을 계획한다.
[반응을 반복해서 살펴보아 테이블 구조나 취약점을 파악해 나간다.](http://blog.naver.com/PostView.nhn?blogId=is_king&logNo=221402635339&parentCategoryNo=&categoryNo=47&viewDate=&isShowPopularPosts=true&from=search)
시간이 오래 걸리기 쉽기 때문에 보통 공격자는 자동화 프로그램을 사용하는 경우가 많다.


