# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn
COPY . .
RUN yarn build:dev

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]