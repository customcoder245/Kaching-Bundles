FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose the port (default 5000, can be overridden by env)
EXPOSE 5000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the server (production mode)
# The "start" script runs the app without the Cloudflare tunnel.
CMD ["npm", "start"]
