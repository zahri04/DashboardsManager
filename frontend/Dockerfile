# building Stage
FROM  node:22.2-alpine3.17 As builder
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Receing Args , URl, PORT of BACKEND withing the outer .env
ARG REACT_APP_API_URL
RUN printf"\nREACT_APP_API_URL=%s\n" "$REACT_APP_API_URL" > .env.production


# build tailwind css
RUN npm run build:tailwind
#build the app with gulp licences (view package.json:Scripts)
#build moved to WORKDIR : /app/build
RUN npm run build


# Production Image
FROM nginx:alpine

# deleting existing default nginx static files
RUN rm -rf /usr/share/nginx/html/*
# copying the build files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]