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
  	bot.sendMessage(chat, "📚 Repo: " + repoName +
  	"\n⤴ Branch: "+ branch + 
  	"\n#⃣ ID: "+ commit.id + 
  	"\n📝 Message: " + commit.message + 
  	"\n😎 Author: " +commit.author.name);
  } 
});

app.post('/create', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  var repoName = data.repository.name;
  var ref_type = data.ref_type;
  var ref = data.ref;
  if (ref_type=='tag'){
      console.log("New tag on " + repoName);
      bot.sendMessage(chat, "📚 Repo: " + repoName +
        "\n✅ Pushed new TAG: "+ ref); 
  } 
  if(ref_type=='branch'){
      console.log("New branch on" + repoName);
      bot.sendMessage(chat, "📚 Repo: " + repoName + 
        "\n⤴ Pushed new branch: "+ ref);     
  
  }
  
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web Service listening at http://%s:%s', host, port);
});
