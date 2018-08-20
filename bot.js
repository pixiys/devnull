const name = "devnull";

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const config = require("./config.json");

const embedColor = 0x8f0c5b;

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
   args[0] = args[0].replace(new RegExp("^" + config.prefix), '')
   if (cmd[args[0]]){
    const helpEmbed = {"title": config.prefix+args[0],"color": embedColor,"fields": [{"name": "Usage","value": cmd[args[0]].usage},{"name": "Description","value": cmd[args[0]].desc}]};
    msg.channel.send({embed: helpEmbed});
   } else if (!args[0]){
    var helpEmbed = {"title": name+" Command Help","color": embedColor,"fields": []};
    Object.keys(cmd).map(x=>{helpEmbed.fields.push({"name":cmd[x].usage,"value":cmd[x].desc});});
    msg.author.send({embed: helpEmbed});    
   } else{
    msg.channel.send({embed: {color:embedColor, description: "no command "+args[0]}});
   };
  }
 },
 ping:{
  usage: config.prefix+"ping",
  desc: "responds with the time, and latency between the server and discord",
  func: function (bot,msg,command,args){
   const pingEmbed = {
    "title": "Pong",
    "color": embedColor,
    "fields": [
     {
      "name": "Time",
      "value": moment().format('LTS')
     },
     {
      "name": "Latency",
      "value": client.ping + "ms"
     }
    ]
   };
   msg.channel.send({embed: pingEmbed});  
  }
 },
 timestamp:{
  usage: config.prefix+"timestamp",
  desc: "responds with the current js timestamp",
  func: function (bot,msg,command,args){
   msg.channel.send({embed: {color:embedColor, description: msg.createdTimestamp}});
  }
 },
 github:{
  usage: config.prefix+"github",
  desc: "responds with the github link for this bot",
  func:  function (bot,msg,command,args){
   msg.channel.send({ embed:{color:embedColor, description: "https://github.com/pixiys/devnull is the link, feel free to contribute!"}});
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
