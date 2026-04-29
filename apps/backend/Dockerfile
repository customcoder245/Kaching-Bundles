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

# Start the server and Cloudflare tunnel (using concurrently)
# The "dev" script defined in package.json runs both server and tunnel.
CMD ["npm", "run", "dev"]
