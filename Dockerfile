FROM node:18.16.0
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY . .

CMD [ "node", "server.mjs" ]