# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY packages/api/package.json ./packages/api/
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install --workspace=@super-repo/api

# Copy source code
COPY packages/api/tsconfig.json ./packages/api/
COPY packages/api/src ./packages/api/src

# Build the application
WORKDIR /app/packages/api
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY packages/api/package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy built files
COPY --from=builder /app/packages/api/dist ./dist

# Copy website static files
COPY packages/website ./public

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
