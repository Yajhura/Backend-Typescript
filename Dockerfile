FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY  . .

RUN npm install

ENV NODE_ENV=production

RUN npm run m:gen  -- src/migrations/initDB

RUN npm run m:run

RUN npm run build

EXPOSE 4272

CMD ["npm", "prod",]