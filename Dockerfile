FROM node:5
MAINTAINER wikitolearn sysadmin@wikitolearn.org
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ADD ./bot.js  /telegram_bot/
ADD ./package.json /telegram_bot/

ADD ./run.sh /telegram_bot/
RUN chmod +x /telegram_bot/run.sh

WORKDIR /telegram_bot/
RUN npm install

CMD ["/telegram_bot/run.sh"]

