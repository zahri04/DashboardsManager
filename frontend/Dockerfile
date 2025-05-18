# 1) Build Stage
FROM node:22-alpine3.21 AS builder
WORKDIR /app

# 1.1) Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci

# 1.2) Copy rest of the source
COPY . .

# 1.3) Inject your backend URL at build time
ARG REACT_APP_API_URL
RUN printf "\nREACT_APP_API_URL=%s\n" "$REACT_APP_API_URL" > .env.production

# 1.4) Build Tailwind CSS assets (if you have a separate script)
RUN npm run build:tailwind

# 1.5) Final production build
RUN npm run build


# 2) Production Image
FROM nginx:alpine

# 2.1) Clear default NGINX content
RUN rm -rf /usr/share/nginx/html/*

# 2.2) Copy in your built app
COPY --from=builder /app/build /usr/share/nginx/html/

# 2.3) Expose the port NGINX will listen on (default 80)
EXPOSE 80

# 2.4) Launch NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
