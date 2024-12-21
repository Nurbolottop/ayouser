# Dockerfile
# Base image
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package.json ../package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY ../src ./src
COPY ../public ./public
COPY ../tsconfig.json ./

# Build the application
RUN npm run build

# Production stage
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy the build output
COPY --from=build /app/build ./build

# Install a simple HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]