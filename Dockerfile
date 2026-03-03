# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies including peer dependencies
RUN npm install

# Copy app source
COPY . .

# Expose the port (same as PORT in server.js or default 3001)
EXPOSE 3001

# Start the server
CMD [ "npm", "run", "server" ]
