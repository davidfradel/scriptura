FROM node:16

WORKDIR /usr/src/app

COPY ./fastify-server/package*.json ./fastify-server/
COPY package*.json ./

RUN npm install --prefix fastify-server
RUN npm install

COPY fastify-server/ ./fastify-server/
COPY guardian /usr/src/app/fastify-server/node_modules/guardian
COPY config ./config

EXPOSE 3000

CMD ["node", "fastify-server/server.js"]