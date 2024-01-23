# Create a build of the project
FROM gradle:8.5.0-jdk17 AS build
WORKDIR /build
COPY . .

RUN ./gradlew build --no-daemon -p .

# Copy the build artifacts
FROM openjdk:17
WORKDIR /app
COPY --from=build /build/build/libs/study-buddy-api-1.0.0-SNAPSHOT.jar app.jar

# Run the app
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
