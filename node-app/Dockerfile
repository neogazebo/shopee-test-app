 FROM neogazebo/node-8:alpine-git AS builder
 MAINTAINER Febri Pratama <neogazebo@gmail.com>

 ENV HOMEAPP /apps

 WORKDIR $HOMEAPP

 COPY . $HOMEAPP

 RUN rm -rf node_modules package-lock.json yarn.lock
 RUN npm install

 FROM node:8-alpine

 WORKDIR /apps

 COPY --from=builder /apps/ /apps/

 EXPOSE 7000

 CMD [ "npm", "start" ]