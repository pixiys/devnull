const name = "devnull";

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

process.on('unhandledRejection', (reason) => {
  console.error(reason);
  process.exit(1);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var cmd =
{ 
 help:{
  usage: config.prefix+"help [command]",
  desc: "responds with the usage and description for a command",
  func: function (bot,msg,command,args){
   if (cmd[args[0]]){
    a = cmd[args[0]];
    msg.channel.send('```\n'+config.prefix+args[0]+"\n\nUsage: "+a.usage+"\n\nDescription: "+a.desc+'\n```');
   } else if (!args[0]){
    msg.author.send("```\n"+name+" Command Help\n\n\n"+Object.keys(cmd).map(x=>{a=cmd[x].usage; return a+' '.repeat(20-a.length)+cmd[x].desc}).join('\n')+'\n```');    
   } else{
    msg.channel.send('No command '+args[0]);
   };
  }
 },
 ping:{
  usage: config.prefix+"ping",
  desc: "responds pong, useful for checking if bot is alive",
  func: function (bot,msg,command,args){
   msg.channel.send('Pong!');  
  }
 },
 timestamp:{
  usage: config.prefix+"timestamp",
  desc: "responds with the current js timestamp",
  func: function (bot,msg,command,args){
   msg.channel.send('`'+msg.createdTimestamp+'`');
  }
 },
 github:{
  usage: config.prefix+"github",
  desc: "responds with the github link for this bot",
  func:  function (bot,msg,command,args){
   msg.channel.send('https://github.com/pixiys/devnull is the link, feel free to contribute!');
  }
 }
}
 
client.on('message', msg => {
 if (msg.author.bot) return;
 if (msg.content.indexOf(config.prefix) !== 0) return;
 const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();
 if (cmd[command]){
  cmd[command].func(this.bot, msg, command, args);
 } else return;
 
});

try{
 client.login(config.token);
} catch (e){
 console.log(e)
}
