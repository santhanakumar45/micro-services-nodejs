# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your application code
COPY . .

# Expose the port that your app will run on
EXPOSE 3003

# Command to run your app
CMD ["npm", "start"]
