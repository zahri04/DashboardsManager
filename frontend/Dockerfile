# Stage 1: Build with Node.js 22
FROM node:22-alpine AS builder
WORKDIR /app

# Install system dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package*.json ./
COPY gulpfile.js ./

# Install dependencies with legacy peer deps for compatibility
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build application with license management
RUN npm run build && npm run licenses

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
