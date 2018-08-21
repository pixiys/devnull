const config = require("./config.json");
const embedColor = 0x19ccb6;
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const {VM} = require('vm2');
const JSON5 = require('json5');

process.on('unhandledRejection', (r) =>console.error(r));
process.on('error', (e)=>console.log(e))

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});

var cmd = {
  help: {
   usage: config.prefix + "help [command]",
   desc: "responds with the usage and description for a command",
   func: function (bot, msg, command, args) {
    if (args[0]) args[0] = args[0].replace(new RegExp("^" + config.prefix), '');
    if (cmd[args[0]]) {
     const helpEmbed = { "title": config.prefix + args[0], "color": embedColor, "fields": [{ "name": "Usage", "value": cmd[
        args[0]].usage }, { "name": "Description", "value": cmd[args[0]].desc }] };
     msg.channel.send({ embed: helpEmbed });
    } else if (!args[0]) {
     var helpEmbed = { "title": config.name + " Command Help", "color": embedColor, "fields": [] };
     Object.keys(cmd).map(x => { helpEmbed.fields.push({ "name": cmd[x].usage, "value": cmd[x].desc }); });
     msg.author.send({ embed: helpEmbed });
    } else {
     msg.channel.send({ embed: { color: embedColor, description: "no command " + args[0] } });
    };
   }
  },
  ping: {
   usage: config.prefix + "ping",
   desc: "responds with the time, and latency between the server and discord",
   func: function (bot, msg, command, args) {
    msg.channel.send({embed:{ "title": "Pong", "color": embedColor, "fields": [{ "name": "Time", "value": moment().format('LTS') }, { "name": "Latency", "value": Math.round(client.ping) + "ms" }] }});
  }
 },
 timestamp: {
  usage: config.prefix + "timestamp",
  desc: "responds with the current js timestamp",
  func: function (bot, msg, command, args) {
   msg.channel.send('`' + msg.createdTimestamp + '`');
  }
 },
 github: {
  usage: config.prefix + "github",
  desc: "responds with the github link for this bot",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { color: embedColor, description: "https://github.com/pixiys/devnull is the link, feel free to contribute!" } });
  }
 },
 exec: {
  usage: config.prefix + "exec <code>",
  desc: "executes javascript code and responds with the result",
  func: function (bot, msg, command, args) {
   if (msg.content.match(/```(js)?([\S\s]*)```/)) {
    var code = msg.content.match(/```(js)?([\S\s]*)```/)[0].replace(/```(js)?([\S\s]*)```/, (...x) => x[2]).replace(/\/\/.*\n/g, '\n').replace(/^\n+|\n+$/gm, '');
   } else {var code = args.join(' ');}
   var output = {console: [], result: null};
   var console = {log:s=>{output.console.push(s)}};
   const vm = new VM( {console: 'redirect',timeout: 1000, sandbox:{output, console}});
   try {output.result = vm.run(code);} 
   catch (e){output.result = e+'';}
   if (!Array.isArray(output.console)){output.console = [];output.result = 'TypeError: output.console was not an Array';}
   var o = ""; if (output.console.length != 0) o += "**Console**\n```js\n" + output.console.slice(-16).map(x=>{
    if(typeof x == 'object'){try{x=JSON5.stringify(x,null,2)}catch (e){}} return x;
   }).map(x=>x+='').join('\n') + "```\n";
   try{ output.result = JSON5.stringify(output.result);} catch (e){}
   msg.channel.send(o + "**Result**\n```js\n" + output.result + "\n```");
  }
 }
}
client.on('message', msg => {
 if (msg.author.bot) return;
 if (msg.content.indexOf(config.prefix) !== 0) return;
 const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();
 if (cmd[command]) {
  cmd[command].func(this.bot, msg, command, args);
 } else return;
});

try {
 client.login(config.token);
} catch (e) {
 console.log(e)
}
