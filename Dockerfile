FROM node:16-alpine as BUILD_IMAGE

RUN apk update && apk add curl bash make && rm -rf /var/cache/apk/* && apk --no-cache add --virtual builds-deps build-base python3

WORKDIR /usr/share/microservices/equmedia-mail-service

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

RUN npm prune --production

RUN npm ci

FROM node:16-alpine

WORKDIR /usr/share/microservices/equmedia-mail-service

COPY --from=BUILD_IMAGE /usr/share/microservices/equmedia-mail-service/dist ./dist
COPY --from=BUILD_IMAGE /usr/share/microservices/equmedia-mail-service/node_modules ./node_modules

EXPOSE 6032

CMD ["node", "dist/main"]
