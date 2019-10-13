const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.user.tag === 'Proinfinto#4632'){
    msg.reply('Sen sus çomar!');
  }
});

client.login(token);
