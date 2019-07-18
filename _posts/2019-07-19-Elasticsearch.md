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
'use strict'

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





