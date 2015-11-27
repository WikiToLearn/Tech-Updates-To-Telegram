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

var gitio = require('gitio');

app.post('/push', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  var repoName = data.repository.name;
  var branch = data.ref.split('/')[2];
  console.log("New PUSH on " + repoName);
  data.commits.forEach(function(commit){
    gitio(commit.url).then(function(shortURL){
      console.log("Commit: " + commit.message);
      console.log("Sending message to " + chat);
      bot.sendMessage(chat, "📚 Repo: " + repoName +
      "\n⤴ Branch: "+ branch + 
      "\n#⃣ ID: "+ commit.id + 
      "\n📝 Message: " + commit.message + 
      "\n😎 Author: " +commit.author.name + 
      "\n🌐 URL: " + shortURL );
    });

  });

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


app.post('/build', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  var image = data.image;
  var tag = data.tag;
  console.log("Build: " + image + ":" + tag);
  bot.sendMessage(chat, "*" + image + ":" + tag + "*" + "\n🐳 Docker Build Completed! 🐳", {parse_mode: "Markdown"});
});

app.post('/staging', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  var commit = data.commit
  var host = data.host
  console.log("Staging UPDATED\nRunning " + commit.slice(0,7) + " on " + host);
  bot.sendMessage(chat, "✳️Staging UPDATED✳️\nRunning " + commit.slice(0,7) + " on " + host);
});


app.post('/start', function (req, res) {
  res.sendStatus(200);
  var data = req.body;
  bot.sendMessage(chat, "💻*Starting Bot*💻\nNow running latest version", {parse_mode: "Markdown"});
});

app.post('/stop', function (req, res) {
  res.sendStatus(200);
  bot.sendMessage(chat, "💻*Stopping Bot*💻", {parse_mode: "Markdown"});
});


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web Service listening at http://%s:%s', host, port);
});



