FROM node:23-alpine

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_WS_URL
ENV VITE_WS_URL=$VITE_WS_URL

WORKDIR /react-app/

COPY package.json .

RUN npm install

COPY . /react-app/

EXPOSE 3000

CMD ["npm", "run", "dev"]