FROM node:5
MAINTAINER wikitolearn sysadmin@wikitolearn.org
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ADD ./bot.js  /telegram_bot/
ADD ./package.json /telegram_bot/

WORKDIR /telegram_bot/
RUN npm install

CMD ["node", "bot.js"]

