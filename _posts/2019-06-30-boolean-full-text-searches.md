---
layout: post
title:  Boolean Full Text Searches ... 1 (TWIL)
categories: [mysql]
tags: [backend, database, mysql]
---


### [Boolean Full Text Searches](https://dev.mysql.com/doc/refman/5.7/en/fulltext-boolean.html) ... 1

mysql은 IN BOOLEAN MODE modifier를 통해서 boolean full-text search를 사요ㅗㅇ할 수 있다.
쿼리에서 +는 present를 -는 absent를 나타낸다. 쿼리는 단어 'yoursql'이 아닌, 단어 'mysql'을 보유하는 모든 rows를 회수한다. 
```
mysql> SELECT * FROM articles WHERE MATCH (title,body)
    AGAINST ('+MySQL -YourSQL' IN BOOLEAN MODE);
+----+-----------------------+-------------------------------------+
| id | title                 | body                                |
+----+-----------------------+-------------------------------------+
|  1 | MySQL Tutorial        | DBMS stands for DataBase ...        |
|  2 | How To Use MySQL Well | After you went through a ...        |
|  3 | Optimizing MySQL      | In this tutorial we will show ...   |
|  4 | 1001 MySQL Tricks     | 1. Never run mysqld as root. 2. ... |
|  6 | MySQL Security        | When configured properly, MySQL ... |
+----+-----------------------+-------------------------------------+
```
> - `+`: and
> - `-`: not
> - `(noting)` : or




##### Boolean full-text searches는 다음의 성격을 갖는다.
 1. 관련성을 바탕으로 하여 내림순으로 자동 정렬되지 않는다.
 1. 
     - Inno DB 테이블은 boolean 쿼리를 수행하기 위해서 MATCH() 표현식의 모든 컬럼을 바탕으로 하는 FULLTEXT 인덱스가 필요하다. 
     - MyISAM 검색 인덱스에 대한 boolean 쿼리는 FULLTEXT 인덱스가 없어도 작동 할 수 있습니다.
         - 다만 검색이 이러한 방식으로 실행되는 경우 상당히 느릴 수 있습니다.
 1. 
     - 최소, 최대 단어 길이 full-text 파라미터는 빌트인 FULLTEXT 파서와 MeCab 파서 플러그인를 사용해서 생성된 FULLTEXT 인덱스에 적용된다.
         - `innodb_ft_min_token_size`와 `innodb_ft_max_token_size`는 inneDB 검색 인덱스에 사용된다.
         -`ft_min_word_len`과 `ft_max_word_len`은 MyISAM 검색 인덱스에 사용된다.
     - 최소 최대 단어 길이 full-text 파라미터는 ngram 파서로 만들어진 FULLTEXT 인덱스에 적용되지 않는다. 
         - ngram token size는 `ngram_token_size` option으로 정의된다.
 1. stopword 목록은 적용하고 조종받는다.
     1. innoDB 검색 인덱스의 
         1. `innode_ft_enable_stopword`, 
         1. `innodb_ft_server_stopword_table`
         1. `innodb_ft_user_stopword_table`
     1. MyISAM 검색 인덱스의
         1. `ft_stopword_file`
 1. 
     - InnoDB full-text search는 복수 operators의 사용을 단일 단어 검색을 지원하지 않는다.
         - `++apple`
     - 단일 단어 검새에서 복수 operators를 사용하면 standard out으로 syntax error를 내보낸다.
     - MyISAM full-text search는 검색어와 바로 인접한 연산자를 제외한 모든 연산자를 무시하고 단일 단어 검색을 성공적으로 처리.  
 1. 
     - InnoDB full-text search는 오직 리딩 +나 -만을 지원한다.
         - `+apple` ( o ), `apple+` ( x )
     - trailing +나 -는 syntax error를 내보낸다.
 1. InnoDB full-text search는 `+*`, `+-`, `+-apple`을 지원하지 않는다. syntax error를 내보낸다.
 1. InnoDB full-text search는 `@`를 boolean full-text searches에서 지원하지 않는다. `@`은 `@distance` 근접 검색 operator를 사용하기 위해 예약됐다. 
 1. MyISAM 검색 인덱스에 적용되는 50 % 임계 값을 사용하지 않습니다.
 
##### Boolean full-text search는 다음의 operators를 지원할 수 있다.
 1. +
     - 해당 단어가 반드시 들어가있다.
     - InnoDB는 리딩 +만 지원
 1. -
     - 해당 단어가 들어가 있으면 안된다.
     - InnoDB는 리딩 -만 지원
     - 참고 : - 연산자는 다른 검색어와 일치하는 행을 제외하기 위해서만 작동합니다. 
     따라서, 앞에 오는 용어 만 포함하는 부울 모드 검색은 빈 결과를 반환합니다. 
     "제외 된 용어가 들어있는 행을 제외한 모든 행"을 반환하지 않습니다. (뭔소리야...)
 1. (no operator)
     - 해당 단어를 optional로 한다.
     - 해당 단어를 소유한 row는 higher rate를 갖는다.
     - 이는 `MATCH() ... AGAINST()`를 IN BOOLEAN MODE modifier 없이 따라한 것이다.
 1. @distance
     - 이 operator는 InnoDB에서만 작동한다.
     - 두 개 이상의 단어가 모두 단어에서 측정 된 서로 지정된 거리 내에서 시작되는지 여부를 테스트합니다. 
     - @distance 연산자 바로 앞에 큰 따옴표로 묶인 문자열 내에 검색 단어를 지정하십시오
         - (예 : MATCH (col1)  AGAINST ( ' "word1 word2 word3"@ 8'BOOLEAN MODE)
     - 뭐라는 걸까...
 1. \> \<
     - 단어의 기여도를 행에 지정된 relevance value로 변경한다.
         - These two operators are used to change a word's contribution 
         to the relevance value that is assigned to a row.
     - \> 은 기여도를 증기시키고 \< 는 감소시킨다.
 1. (  )
     - 괄호는 단어를 부분 표현으로 그룹화합니다. 
     - 괄호로 묶은 그룹은 중첩 될 수 있습니다.
 1. ~
     - 선행 물결 기호는 부정 연산자로 사용되며 행의 관련성에 대한 단어의 기여도가 음수가됩니다. 
     - 이것은 "노이즈"단어를 표시하는 데 유용합니다.
     - 해당 단어를 포함하는 행은 다른 단어보다 낮은 등급으로 표시되지만 - 처럼 제외되지는 않습니다.
 1. *
     - 와일드 카드나 truncation
     - truncation
         - truncation으로 지정되면 너무 짧거나 중지 단어 인 경우에도 부울 쿼리에서 제거되지 않습니다.
         - 단어가 너무 짧은지 여부는 InnoDB 테이블의 `innodb_ft_min_token_size` 설정 
        또는 MyISAM 테이블의 `ft_min_word_len`에 의해 결정됩니다.
         - 이 옵션은 ngram 구문 분석기를 사용하는 FULLTEXT 인덱스에는 적용되지 않습니다
     - 와일드 카드
         - 와일드 카드 단어는 하나 이상의 단어의 시작 부분에 있어야하는 접두어로 간주됩니다. 
         - 최소 단어 길이가 4이면 '+ word + the *'에 대한 검색은 '+ word + the'에 대한 검색보다 적은 행을 반환 할 수 있습니다.
             - 두 번째 검색어는 너무 짧은 검색어인 the를 무시하기 때문입니다.
 1. \"
     - 큰 따옴표 (")로 묶여있는 phrase는 입력된 그대로를 포함하는 행만 선택합니다. 
     - full-text engine은 phrase를 단어로 분할하고 단어에 대해 FULLTEXT index에서 검색을 수행합니다. 
     - phrase 검색은 phrase과 정확히 동일한 단어를 포함하고 동일한 순서로만 요구합니다 
         - (예 : "test phrase"는 "test, phrase"와 일치 함).
     - phrase의 단어에 해당 단어가 없으면 결과는 empty가 됩니다. 
     - 해당 단어가 다음의 조건들에 해당, 조합되어 색인에 포함되지 않을 수 있습니다.
         - 텍스트에 존재하지 않거나 
         - 불용어이거나 
         - 색인어의 최소 길이보다 짧은 경우 
 
##### 다음의 예시들은 Boolean full-text operators의 결과를 보줍니다.
 1. `apple banana`
     - 둘 중 하나라도 들어간 row
 1. `+apple +juice`
     - 두 단어 모두 들어간 row
 1. `+apple macintosh`
     - `apple`이 들어간 row
     - `macintosh`가 들어가면 higher rate를 갖음
 1. `+apple -macintosh`
     - `apple`이 들어가 있음
     - `macintosh`는 없음
 1. `+apple ~macintosh`
     - `apple`이 존재하는 row
     - 해당 row에 `macintosh`가 있다면 없는 row보다 lower rate를 갖음  
 1. `+apple +(>turnover <strudel)`
     - `apple`과 `turnover` 둘을 모두 가진 row
     - 혹은 `apple`과 `strudel` 둘을 모두 가진 row 
     - 그러나 `apple turnover`쪽이 `apple strudel`보다 높은 rate를 갖는다.
 1. `apple*`
     - 이하 모두 가능
         - `apple`, `apples`, `applesauce`, `applet` 
 1. `"some words"`
     - 정확히 "some words"를 갖는 row
         - (예 : "지혜의 일부 단어는 있지만 일부 단어는 포함하지 않는 행")
     - `"`phrase에 해당되는 문자는 phrase를 구분하는 연산자 문자가 되며 검색 문자열 자체를 묶는 따옴표가 아닙니다.
         - ....뭐라고요?
 

<!--
#### InnoDB의 Boolean Mode Search를 사용한 Relevancy Rankings
##### 어떻게 랭킹이 계산되나
##### 단일 단어 검색의 랭킹
##### 복수 단어 검색의 랭킹
-->