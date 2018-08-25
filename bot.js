const fs          = require('fs')
const Discord     = require('discord.js');
const moment      = require('moment');
const {VM}        = require('vm2');
const JSON5       = require('json5');
const request     = require("request");
const cheerio     = require("cheerio");
const client      = new Discord.Client();

var config        = require("./config.json");
var alias         = require('./alias.json');
const permissions = require("./permissions.json");
config.embedColor = eval('('+config.embedColor+')');

const baseCmd = eval('('+fs.readFileSync(__dirname+'/commands/base.js')+')');
const utilCmd = eval('('+fs.readFileSync(__dirname+'/commands/util.js')+')');
const userCmd = eval('('+fs.readFileSync(__dirname+'/commands/user.js')+')');
const funCmd  = eval('('+fs.readFileSync(__dirname+'/commands/fun.js') +')');
const miscCmd = eval('('+fs.readFileSync(__dirname+'/commands/misc.js')+')');
var cmd = Object.assign({}, baseCmd, utilCmd, userCmd, funCmd, miscCmd);

process.on('unhandledRejection', r=>console.error(r));
process.on('error', e=>console.log(e));

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
 if (msg.author.bot) return;
 if (msg.content.indexOf(config.prefix) !== 0) return;
 const command0 = msg.content.slice(config.prefix.length).trim().split(/ +/g).shift().toLowerCase();
 if (alias[command0]) msg.content = alias[command0];

 const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();
 const exec = ()=>cmd[command].func(this.bot, msg, command, args); 

 if (!cmd[command]) return;
 if (!permissions[command]) {exec(); return;}
 if (!msg.member){msg.channel.send({ embed: { color: config.embedColor, description: "You must be in a server to use this command."}});return;}
 if (!Array.isArray(permissions[command])) {if (msg.member.roles.find("name", permissions[command])) exec(); return; }
 if (permissions[command].indexOf("+above+") < 0) { for (var i in permissions[command]) if (msg.member.roles.find("name", permissions[command][i])) {exec(); return;} return;}
 for (var i in permissions[command]) {
  if (permissions[command][i] == "+above+") {if (msg.member.highestRole.calculatedPosition >= msg.member.guild.roles.find("name", permissions[command][i-1]).calculatedPosition){exec(); return;}}
  if (msg.member.roles.find("name", permissions[command][i])) {exec(); return;}
 }
 exec();
});

Object.keys(cmd).forEach(i=>{if (cmd[i].init) cmd[i].init();});

try {
 client.login(config.token);
} catch (e) {console.log(e)}
