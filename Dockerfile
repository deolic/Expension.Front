# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY Expension.Front/package*.json ./
RUN npm install
COPY Expension.Front/. .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY Expension.Front/nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]