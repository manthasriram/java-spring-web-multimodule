jersey-spring-kickstart-angular-bootstrap
=======================

A kickstart project based on Jersey 2, Spring 4, Servlet 3.1 (annotation-based, no XMLs).

You can run the app via maven using **mvn tomcat7:run** and see some action doing a GET on http://localhost:8080/api/tasks

Uses Maven, npm, bower to install dependecnies

npm, grunt and bower are used to manage the javascript dependencies

run grunt to install the javascript dependencies
running grunt will add the dependecies in the index.html

The optimized, minified version is generated and stored in the build directory. This can be copied in to the target folder

The barebones projects has the following configures

* Logback
* mongo
* Joda time
* Apache Commons
* Spring
* Jersey


http://www.radcortez.com/javascript-package-management-npm-bower-grunt/


Installation

1. npm install
2. npm install -g grunt-cli
