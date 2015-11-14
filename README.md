# GitHub Commits to Telegram

Simple script to automatically post GitHub commits to a Telegram Group or Channel. 

## Setup

- Download/Clone this repo
- node install
- Create a Telegram Bot (https://core.telegram.org/bots#botfather)
	- Set the 'token' variable inside bot.js with the generated token.
- Add the newly crated bot to your channel/chat (if adding it to a channel add the bot as an administrator)
	- Set the 'chat' variable inside bot.js with the username of the channel (formatted as @channelusername) or with the Group Chat Id.
- Make sure the port 8421/TCP is open on your Firewall/Router (you can change the port editing bot.js)
- Make sure the machine/newtork running thr script is always reacheable from the outside either by having a static public IP or by a domain name (if you have a dynamic IP look into Dynamic DNS services such as duckdns)
- Login to GitHub and open the repo you want to receive live updates from
- Add a new WebHook following this guide https://developer.github.com/webhooks/creating/
	- Payload URL: http://<yourdomain/staticIP>:8421/push
	- Content Type: application/json
	- Events: Just the push event
	- You can do this for as many repos as you want


## Running the bot
- node bot.js

## Stopping the bot
- CTRL+C

## Solving Problems
- GitHub updates are not delivering
	- Make sure the script can be accessed from the outside of your network.
	- Make sure the port 8421/TCP is open on your Firewall/Router

- The script is not posting to Telegram
	- Make sure you have set the 'token' variable
	- Make sure you have added the bot to your Telegram Group or as an admin to your Telegram Channel


## License
GPL 