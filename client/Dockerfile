# Use a Node.js base image to build the client application
FROM node:20.10.0 AS builder

# Set the working directory inside the container
WORKDIR /home/ubuntu/recipe-app-docker/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY client .

# Build the client application
RUN npm run build

# Use a lightweight web server (Nginx) to serve the built client application
FROM nginx:alpine

# Copy the built client application from the previous stage to the appropriate directory in the Nginx image
COPY --from=builder /home/ubuntu/recipe-app-docker/client/build /usr/share/nginx/html

# Expose port 80 (the default port for HTTP traffic)
EXPOSE 80

# Command to run Nginx (will start serving the client application)
CMD ["nginx", "-g", "daemon off;"]
