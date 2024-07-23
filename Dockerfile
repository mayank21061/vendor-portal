# Dockerfile

# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

COPY ./.env /usr/src/app/public

# Build the Next.js application
RUN yarn build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "start"]
