FROM node:16

WORKDIR /usr/src/app

COPY express-server/package*.json ./express-server/
COPY package*.json ./

RUN npm install --prefix express-server
RUN npm install

COPY express-server/ ./express-server/
COPY guardian /usr/src/app/express-server/node_modules/guardian
COPY config ./config

EXPOSE 3000

CMD ["node", "express-server/server.js"]