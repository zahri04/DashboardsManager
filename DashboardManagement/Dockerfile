# Stage 1: Build the application
FROM maven:3.8.6-eclipse-temurin-21 as builder
WORKDIR /app
COPY src ./src
COPY pom.xml .
RUN mvn clean package -DskipTests


# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar /app/app.jar
EXPOSE ${SERVER_PORT}
CMD ["java", "-jar", "app.jar"]
