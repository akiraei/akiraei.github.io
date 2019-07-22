---
layout: post
title: Elasticsearch (TWIL)
categories: [database]
tags: [database, backend, search]
---

### [Inverted Index](https://victorydntmd.tistory.com/308)

- index: 색인. 책 앞에 있는 목차
- inverted index: 역색인. 책 맨 뒤에 있어서 키워드 마다 찾아 볼 수 있는 찾아보기
> ![색인과 역색인](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99CC10405C98CC48265959)
- Eleasticsearch는 문장을 파싱해 단어들을 따로 저장하고 대소문자, 유사어 처리 등을 다 해놓고 텍스트를 저장한다.
- RDBMS보다 FTS에서 빠른 성능



### [http로 통신](https://12bme.tistory.com/171)




### [javascript client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
Elasticsearch는 JS 클라이언트를 지원한다.

1. INSTALL
  - Elasticsearch를 설치한다.
  - [Docker를 써보자.](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-cli-run)
      1. `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.2.0`
      1. `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.2.0`
1. [NPM](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html)
  - NPM을 INIT하고 Elasticsearch 클라이언트를 설치한다.
  - `npm install @elastic/elasticsearch`
  
  ```js

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
    // Let's start by indexing some data
    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })

    // Let's search!
    const { body } = await client.search({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
            query: {
                match: { quote: 'dragon' }
            }
        }
    })

    console.log(body.hits.hits)
}

run().catch(console.log) 
```




### [MYSQL과 연결 - LOGSTASH](https://geniedev.tistory.com/6)

#### logstash?
  - 정보를 가공해서 연결해 주는 pub-sub?!
  - input 받고 output 하는데 굉장히 많은 선택지를 가지고 있다.
 
#### logstash pipeline의 주요소
  - input
      - data를 받아오는 곳
      - ex) sql
  - filter
      - 가공
  - ouput
      - data를 보내는 곳
      - ex) elasticsearch
 - codec
      - 데이터의 포맷
      - ex) rubydebug, json


#### JDBC
 - JDBC는 Java와 Oracle을 이어주는 역할을 한다.
 - 이를 통해 logstash와 mysql을 연결한다.
 - ~~최신 logstash에는 내장 되어 있다.~~
 

#### [은전한닢](https://bitbucket.org/eunjeon/seunjeon/src/6e8a067fb9a12bcdcdd7f858fd84714c94835f04/elasticsearch/)
 - 한국어 검색에서 형태소 분해를 위한 분석기가 필요하다.
 - 은전한닢은 `훌륭한 오픈소스 한국어 형태소 분석기`란다.
 
#### [Nori 웨비나](https://www.elastic.co/kr/webinars/nori-elasticsearch-korean-text-analyzer)
 - 은전한닢이 훌륭하다면 Nori 웨비나는 공식이다.
 - **공식**으로 가자
 
 
#### 실행
 - logstash를 설치
      - [docker](https://www.elastic.co/guide/en/logstash/5.4/docker.html): `docker pull docker.elastic.co/logstash/logstash:5.4.3`
      - [brew](https://www.elastic.co/guide/en/logstash/7.2/installing-logstash.html#brew)
          - JDk8: `brew cask install homebrew/cask-versions/adoptopenjdk8` 
          - open tap: `brew tap elastic/tap`
          - install logstash: `brew install elastic/tap/logstash-full`
 - [jdbc-plugin](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-jdbc.html)~~을 설치~~
      - 도커 이미지에 접속한다: `docker exec -it [docker container id] /bin/bash`
      - 설치: `/bin/elasticsearch-plugin install jdbc` 
 - ~~은전한닢~~[Nori 웨비나를 설치](https://wedul.site/517)
      - 도커 이미지에 접속한다: `docker exec -it [docker container id] /bin/bash`
      - 설치: `/bin/elasticsearch-plugin install analysis-nori` 
      - 재실행 후 확인: `(get) http://localhost:9200/_cat/plugins`
 - logstash와 mysql을 jdbc로 연결
      - logstash.yml을 생성
      - 내용을 작성
 ```
                input {
                      jdbc {
                            jdbc_driver_library => "mysql-connector-java-5.1.36-bin.jar"
                            jdbc_driver_class => "com.mysql.jdbc.Driver"
                            jdbc_connection_string => "jdbc:mysql://localhost:3306/"
                            jdbc_user => "********"
                            jdbc_password => "********"
                            parameters => { "favorite_artist" => "Beethoven" }
                            schedule => "* * * * *"
                            statement => "SELECT * from [as you want]"
                            }
                      }
             output {
                 elasticsearch {
                     hosts = ["localhost:9200"]
                 }    stdout {
                     codec = rubydebug
                 }
             }
```
 - logstash를 logstash.yml을 적용해서 실행
      - docker: `docker run --rm -it -v ~/settings/logstash.yml:[logstash.yml의 주소]  docker.elastic.co/logstash/logstash:5.4.3`
      - brew
          1. `brew services start elastic/tap/logstash-full`
          1. `logstash`
 - ~~은전한닢~~Nori 웨비나를 분석기(analyzer, tokenizer)로 적용해서 index를 생성
     - http `POST`의 내용으로 보낼 수도 있고, javascript client로 입력할 수도 있다.
     
     


