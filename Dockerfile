FROM eclipse-temurin:21-jre

WORKDIR /voya-app

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]