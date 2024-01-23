# study-buddy-api

This is the back component of the Study Buddy project. This project uses [Java Spring](https://spring.io/) as a framework and [Gradle](https://gradle.org/) for dependency management. In addition, sample unit tests are provided using [JUnit](https://junit.org/junit5/). Additional utility libraries worth mentioning which are pre-installed are: [Lombok](https://projectlombok.org/), [Google Guava](https://github.com/google/guava), and [Apache Commons](https://commons.apache.org/).

This set of tools has been chosen to be a solid, simple foundation for backend/api development that mimics what is commonly used in production applications that are developed in the industry. However, as consultants, your team may discover that a different tool or library suits the needs of your specific project better than what we have provided here. If you choose to replace some of the pieces of the project, please just run it by your mentors and the class TAs in your next scrum meeting; just keep in mind that the mentors and class TAs are only guaranteed to be familiar and be able to provide help with this specific set of tools. Using additional tools is always allowed and encouraged!

**For installation and setup instructions, see the root folder's README.**

## Quick Reference

To run the server locally, click the play button next to the `main()` method in `StudyBuddyApplication.java`. Your API will be available at `http://localhost:8080`.

To test a build of the project in the same way that your CI/CD pipeline will, run:
```bash
./gradlew build
```

To run the unit tests, click their corresponding run button, right-click on the `test/` folder and click "Run tests in ...", or use the following command:
```bash
./gradlew test
```

## Overview of Pre-Configured Tools

### Java Spring (Boot)

Spring/Spring Boot is an open source framework and inversion of control container for Java that was created to address the complexity of developing enterprise applications. Spring has layered architecture that allows developers to leverage certain components while not utilizing others that they may not care about. Spring’s biggest features include:

1.	Transaction management – Spring allows for pluggable transaction managers to deal with transactions
2.	Inversion of control container – Spring allows for dependency injection, which helps with the configuration and management of Java objects
3.	Data access – Easy integration with Hibernate and JDBC
4.	Model-View-Controller (MVC) – Spring provides a framework for extending and customizing web applications
5.	Messaging – Spring is able to leverage existing technologies, such as Java Messaging Service (JMS) for sending messages

Some of these technologies will be vital to your project, and Spring allows for easy integration with other useful technologies and frameworks.

To learn more about how to use Spring, we recommend checking out the following guides:

- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/) - this guide gives a brief introduction on the connection between Spring and your database
- [Scheduling Tasks](https://spring.io/guides/gs/scheduling-tasks/)
- [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
- [Spring Guides](https://spring.io/guides/) - contains all of the guides above and many more that you might find useful
- [Spring by Example](http://www.springbyexample.org) - general tutorial for all things Spring

It's also worth mentioning that Spring manages the connection to your database using the Jakarta Persistence API (formerly known as JPA). If you are looking up how to do something with your database objects, make sure to include that keyword!

### Lombok

Lombok is a library which provides many Java annotations to reduce boilerplate code by automatically generating code for you! For example, in this project, the `@Data` annotation is used in entity classes (like `User`) to automatically generate getters, setters, `equals`, and `hashCode` to reduce boilerplate. To learn more, check out:

- [Lombok](https://projectlombok.org/)
- [Lombok Features](https://projectlombok.org/features/) - quick reference of the most common Lombok annotations

### Guava / Apache Commons

Both of these libraries contain many utility functions to make common Java tasks simpler and easier. These are pre-installed simply as a convenience measure, as many tutorials and guides you will find online for Java will reference code from one of the two of them. To learn more, take a look at the following:

- [Guava GitHub](https://github.com/google/guava) - home page for Guava
- [Guava Documentation](https://javadoc.io/doc/com.google.guava/guava/latest/index.html) - Javadocs
- [Apache Commons](https://commons.apache.org/) - home page for Apache Commons
- [Apache Commons Documentation](https://commons.apache.org/proper/commons-lang/apidocs/index.html) - Javadocs
