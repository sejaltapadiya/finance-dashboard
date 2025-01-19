# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file from the target directory to the container
COPY target/risk-assessment-0.0.1-SNAPSHOT.jar /app/risk-assessment-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app runs on
EXPOSE 9192

# Command to run the jar file
ENTRYPOINT ["java", "-jar", "/app/risk-assessment-0.0.1-SNAPSHOT.jar"]
