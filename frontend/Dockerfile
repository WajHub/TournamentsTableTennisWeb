# Stage 1
FROM node:23-alpine AS build

ARG VITE_API_URL
ENV VITE_API_URL=http://localhost:80

ARG VITE_WS_URL
ENV VITE_WS_URL=ws://localhost:80

WORKDIR /react-app/

COPY package.json .

RUN npm install

COPY . /react-app/

EXPOSE 3000

RUN npm run build

# Stage 2
FROM nginx:1.27.2 AS ngi

COPY --from=build /react-app/dist /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80