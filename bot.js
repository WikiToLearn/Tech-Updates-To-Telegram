var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var TelegramBot = require('node-telegram-bot-api');

var token = process.env.TELEGRAM_TOKEN;
var chat = process.env.CHAT;
var port = process.env.PORT || 8421;
var bot = new TelegramBot(token);


app.post('/push', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  var repoName = data.repository.name;
  var branch = data.ref.split('/')[2];
  console.log("New commit on " + repoName);
  for (var i=0;i<data.commits.length;i++){
  	commit = data.commits[i];
  	bot.sendMessage(chat, "Repo: " + repoName +
  	"\nBranch: "+ branch + 
  	"\nID: "+ commit.id + 
  	"\nMessage: " + commit.message + "\nAuthor: " +commit.author.name);
  } 
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web Service listening at http://%s:%s', host, port);
});
