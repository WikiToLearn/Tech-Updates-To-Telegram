#!/bin/bash

docker run -dti -p 31415:31415 --name telegrambot -e TELEGRAM_TOKEN="" \
 -e CHAT='' \
 -e CHAT_PRIVATE='' \
 -e PORT=31415 wikitolearn/telegram-bot:0.6
