# Stage 1: Build the application
#the image is contained with maven for building the jar file
FROM maven:3.8.6-eclipse-temurin-21 as builder
WORKDIR /app
COPY src ./src
COPY pom.xml .
#generate the jar file inside /app/target/
RUN mvn clean package -DskipTests




# Stage 2: Create the runtime image
# the image for running the jar file, no maven only jdk21(Spring boot Code is transformed into base java code)
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar ./app.jar
# Expose the port that the application will run on
EXPOSE 8080
# Set the command to run the application
#equivalent to java -jar app.jar in the terminal
CMD["java","-jar","app.jar"] 
