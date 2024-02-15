# Use Node.js version 20.10.0 as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 (or the port your Express.js application listens on)
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]