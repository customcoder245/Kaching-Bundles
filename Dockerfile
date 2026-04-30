# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
RUN npm install
COPY apps/frontend ./apps/frontend
RUN npm run build --workspace=frontend

# Stage 2: Setup Backend & Serve
FROM node:20-alpine
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies for backend
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN npm install --omit=dev

# Copy backend source
COPY apps/backend ./apps/backend

# Copy built frontend assets from stage 1
COPY --from=frontend-builder /app/apps/frontend/dist ./apps/frontend/dist

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start", "--workspace=backend"]
