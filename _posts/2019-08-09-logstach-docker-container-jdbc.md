---
layout: post
title: Logstash-Docker_container-with_JDBC (TWIL)
categories: [database]
tags: [database, backend, search]
---

#### Logstash

#### JDBC
##### [Connector/J: mysql-connector-java](https://dev.mysql.com/downloads/connector/j/5.1.html)


#### [At Docker](https://github.com/logstash-plugins/logstash-input-jdbc/issues/198)

##### logstash.conf

```
input {
    jdbc { jdbc_driver_library => "/usr/share/logstash/mysql-connector-java-5.1.36-bin.jar"
    jdbc_driver_class => "com.mysql.jdbc.Driver"
    jdbc_connection_string => "jdbc:mysql://localhost:3306/yazilimokulu"
    jdbc_user => "root" jdbc_password => "1"
    schedule => "* * * * *"
    statement => "select * from posts" }
    tcp {
         port => 5000
         }
       }
```

##### [FROM](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter07/02)

##### [ADD](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter07/09)

##### exaticuve

```
ROM docker.elastic.co/logstash/logstash:5.2.2
RUN logstash-plugin install logstash-input-jdbc
ADD mysql-connector-java-5.1.36-bin.jar /usr/share/logstash/mysql-connector-java-5.1.36-bin.jar
```


