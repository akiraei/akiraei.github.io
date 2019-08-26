---
layout: post
title: Logstash-Docker_container-with_JDBC (TWIL)
categories: [database]
tags: [database, backend, search]
---

#### Logstash

 - 실시간으로 데이터 파이프라인을 통해서 데이터를 수집
 - 설정이 전부다
 - input -> filter -> output
 - [docker](https://www.elastic.co/guide/en/logstash/current/docker.html)로 실행가능 
     - `docker pull docker.elastic.co/logstash/logstash:7.3.0`

#### [JDBC](https://ko.wikipedia.org/wiki/JDBC)

 - 자바에서 데이터베이스에 접속할 수 있도록 하는 자바 API
 
##### [Connector/J: mysql-connector-java](https://dev.mysql.com/downloads/connector/j/)
 
 - mysql을 위한 공식 JDBC 드라이버. 
 - operating system을 `platform independent`으로 설정
 - `tar`, `zip` 확장자로 다운 받을 수 있다. 아무거나 상관 없다.
 - 다운로드된 파일을 압축해제하면 `mysql-connector-java-8.0.17.jar`을 찾을 수 있다.
     - `-8.0.17`은 버전이므로 바뀔 수 있다.
 - 이 파일을 logstash와 연결할 것이다.

#### [At Docker](https://github.com/logstash-plugins/logstash-input-jdbc/issues/198)
 

##### logstash.conf

```
input {
    jdbc { 
            jdbc_driver_library => "/mysql-connector-java-8.0.17.jar"
            jdbc_driver_class => "com.mysql.jdbc.Driver"
            jdbc_connection_string => "jdbc:mysql://localhost:3306/[table_name]"
            jdbc_user => "root" 
            jdbc_password => "1"
            schedule => "* * * * *"
            statement => "select * from posts"}
            tcp { 
                port => 5000 // 이건 왜 쓰는거지? 잘 모르겠네. tcp 빼야겠다
                }
         }
}                  
output {
    elasticsearch {
        hosts => ["localhost:9200"] // 타입 배열?!. 안에 들어있는 9200은 docker로 띄운 엘라스틱서치의 주소
        user => "logstash_system"
        password => "NAiEx0q7Jy144G0nlTBG"
    }    
    stdout {
        codec => rubydebug
    }
}              
```

- 주의 사항
    1. elasticsearch [계정정보](https://principle486.tistory.com/entry/Attempted-to-resurrect-connection-to-dead-ES-instance-but-got-an-error)


- [dockerfile로 연결하기](https://www.elastic.co/guide/en/logstash/current/docker-config.html)


##### [FROM](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter07/02)

- `FROM <이미지> 또는 FROM <이미지>:<태그>` 형식입니다.

##### [ADD](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter07/09)

-  `ADD <복사할 파일 경로> <이미지에서 파일이 위치할 경로>` 형식입니다.
- <복사할 파일 경로>는 컨텍스트 아래를 기준으로 하며 컨텍스트 바깥의 파일, 디렉터리나 절대 경로는 사용할 수 없습니다.
- <이미지에서 파일이 위치할 경로>는 항상 절대 경로로 설정해야 합니다. 그리고 마지막이 /로 끝나면 디렉터리가 생성되고 파일은 그 아래에 복사됩니다.


##### [dockerfile](https://docs.docker.com/engine/reference/builder/)

- dockerfile을 작성해서 실행해 보자
- dockerfile을 만든다. 확장자도 없이 아주 그냥. 확장자도 없는 파일인가봄.

``` dockerfile
FROM docker.elastic.co/logstash/logstash:7.3.0
RUN logstash-plugin install logstash-input-jdbc
ADD /mysql-connector-java-8.0.17/mysql-connector-java-8.0.17.jar /jdbc/
```
- dockerfile을 [실행해 보자](https://blog.naver.com/PostView.nhn?blogId=alice_k106&logNo=220646382977&parentCategoryNo=7&categoryNo=&viewDate=&isShowPopularPosts=true&from=search)
    - `docker build -t <dockerfile로 인해서 새로 생길 이미지의 이름> <dockerfile의 위치>`
    - 예시: `docker build -t fromtest:0.0 .`
- 위의 dockerfile을 실행하면 설정이 먹힌 docker_image를 얻게 된다.
    - `docker image ls`로 확인 가능

#### execution 

##### [config 대로 실행](https://www.elastic.co/guide/en/logstash/current/docker-config.html)
- 전체 config 파일 대상
    - 예시: `docker run --rm -it -v ~/settings/:/usr/share/logstash/config/ docker.elastic.co/logstash/logstash:7.3.0`
- 단일 config 파일 대상
    - `docker run --rm -it -v ~/settings/logstash.yml:[logstash.yml의 주소] [docker_image]`
    - 예시: `docker run --rm -it -v ~/settings/logstash.yml:/usr/share/logstash/config/logstash.yml docker.elastic.co/logstash/logstash:7.3.0`

#### 실행
- `docker run -p 9600:9600 --name <닉네임> <build한 docker image>`
