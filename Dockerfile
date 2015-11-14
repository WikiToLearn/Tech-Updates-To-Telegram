FROM node:5
MAINTAINER wikitolearn sysadmin@wikitolearn.org
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ADD ./package.json /telegram_bot/
WORKDIR /telegram_bot/
RUN npm install
ADD ./bot.js  /telegram_bot/

CMD ["node", "bot.js"]

