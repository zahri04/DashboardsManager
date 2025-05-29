# 1) Build Stage
FROM node:22-alpine3.21 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG REACT_APP_API_URL
RUN printf "\nREACT_APP_API_URL=%s\n" "$REACT_APP_API_URL" > .env.production
RUN npm run build:tailwind
RUN npm run build

# 2) Production Image
FROM nginx:alpine

# clear out default content
RUN rm -rf /usr/share/nginx/html/*

# copy build artifacts
COPY --from=builder /app/build /usr/share/nginx/html/

# copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
