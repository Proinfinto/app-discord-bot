const Discord = require('discord.js');
const { prefix, token, giphyToken, tokens } = require('./config.json');
const client = new Discord.Client();
const GphApiClient = require('giphy-js-sdk-core');



giphy = GphApiClient(giphyToken);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('\x1b[36m%s\x1b[0m','Dux Bots, Properties; ');
  console.table(["!gif @UserName gifcategory", "!apex irb33"]);
});

client.on('message', msg => {

  /* ### GIPHY - !gif @Profinto cat ###*/
  if(msg.content.startsWith(`${prefix}gif`)) {

    let member = msg.mentions.members.first();
    let gifsearch = msg.content.split(" ");

    giphy.search('gifs', {"q": ""+ gifsearch[gifsearch.length-1] +""})
      .then((response) => {
        var totalResponses = response.data.length;
        var responseIndex = Math.floor((Math.random() * 10) +1) % totalResponses;
        var responseFinal = response.data[responseIndex];

        msg.channel.send(":wave: Hey!" + member.displayName + ";", {
          files: [responseFinal.images.fixed_height.url]
        })
      }).catch(() => {
        msg.channel.send("Error");
      })
  }

  /* ### APEX GET USER INFO ### */
  if(msg.content.startsWith(`${prefix}apex`)) {
    let user = msg.content.split(" ");

    var http = require("http");
    var req = http.request("http://api.mozambiquehe.re/bridge?version=2&platform=PC&player="+user[user.length-1]+"&auth=NZ75Qe0THl7JwnkJI2qw", function (res) {
    var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        var obj = JSON.parse(body);
        msg.channel.send(
        user[user.length-1] + ": \n Rank Score : " + obj["global"]["rank"]["rankScore"] +
        " \n level : " + obj["global"]["level"] +
        " \n Rank : " + obj["global"]["rank"]["rankName"] +"  "+ obj["global"]["rank"]["rankDiv"] ,
        {
          files: [obj["global"]["rank"]["rankImg"]]
        });
      });
    });
    req.end();

  }
  /*
  if(msg.member.user.tag === 'Proinfinto#4632'){
    giphy.search('gifs', {"q": "fail"})
      .then((response) => {
        var totalResponses = response.data.length;
        var responseIndex = Math.floor((Math.random() * 10) +1) % totalResponses;
        var responseFinal = response.data[responseIndex];

        msg.channel.send(msg.member.dispayName + " you", {
          files: [responseFinal.images.fixed_height.url]
        })
      }).catch(() => {
        msg.channel.send("Error ugh!");
      })
  }
  */
});

client.login(token);
