# Create a build of the project
FROM node:20 AS build
WORKDIR /build
COPY . .

# Use ARG to pass the environment variable into the build stage
ARG NEXT_PUBLIC_API_URL
# Make it available as an environment variable during the build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN yarn install
RUN yarn run build

# Copy the build artifacts
FROM node:20
WORKDIR /app
COPY --from=build /build .

# Run the app
ENTRYPOINT exec yarn start