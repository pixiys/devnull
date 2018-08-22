const fs      = require('fs');
const Discord = require('discord.js');
const moment  = require('moment');
const {VM}    = require('vm2');
const JSON5   = require('json5');
const client  = new Discord.Client();

var config        = require("./config.json");
config.embedColor = eval('('+config.embedColor+')');

const baseCmd = eval('('+fs.readFileSync(__dirname+'/commands/base.js')+')');
const utilCmd = eval('('+fs.readFileSync(__dirname+'/commands/util.js')+')');
const funCmd  = eval('('+fs.readFileSync(__dirname+'/commands/fun.js') +')');
const miscCmd = eval('('+fs.readFileSync(__dirname+'/commands/misc.js')+')');
var cmd = Object.assign({}, baseCmd, utilCmd, funCmd, miscCmd);

process.on('unhandledRejection', r=>console.error(r));
process.on('error', e=>console.log(e));

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});

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
} catch (e) {console.log(e)}
