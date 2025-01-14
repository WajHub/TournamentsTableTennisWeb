FROM node:23-alpine

WORKDIR /react-app/

COPY package.json .

RUN npm install

COPY . /react-app/

EXPOSE 3000

CMD ["npm", "run", "dev"]