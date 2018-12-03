FROM node:11.3.0-alpine
RUN apk add --update --no-cache --virtual .npm-deps \
  python build-base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
EXPOSE 3000
CMD [ "yarn" ]
# 11.3.0
