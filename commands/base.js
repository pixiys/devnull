{
 help: {
  usage: config.prefix + "help [command]",
  desc: "Responds with the usage and description for a command.",
  func: function (bot, msg, command, args) {
   if (args[0]) args[0] = args[0].replace(new RegExp("^" + config.prefix), '');
   if (cmd[args[0]]) {
    var helpEmbed = {
     title: config.prefix + args[0],
     color: config.embedColor,
     fields: [{
      name: "Usage",
      value: cmd[args[0]].usage
     }, { 
      name: "Description", 
      value: cmd[args[0]].desc+(permissions[args[0]]?' (requires permission)':'')
     }]
    };
    if (cmd[args[0]].help) helpEmbed.fields.push({name: "Extra", value: cmd[args[0]].help});
    msg.author.send({ embed: helpEmbed });
   } else if (!args[0]) {
    var helpEmbed = { title: config.name + " Command Help", color: config.embedColor, fields: [] };
    Object.keys(cmd).map(x => { helpEmbed.fields.push({ name: cmd[x].usage, value: cmd[x].desc+(permissions[x]?' (requires permission)':'') }); });
    msg.author.send({ embed: helpEmbed });
   } else {
    msg.channel.send({ embed: { color: config.embedColor, description: "no command " + args[0] + '.' } });
   };
  }
 },
 ping: {
  usage: config.prefix + "ping",
  desc: "Responds with the time, and latency between the server and Discord.",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { title: "Pong", color: config.embedColor, fields: [{ name: "Time", value: moment().format('LTS') }, { name: "Latency", value: Math.round(client.ping) + "ms" }] } });
  }
 },
 github: {
  usage: config.prefix + "github",
  desc: "Responds with the Github link for this bot.",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { color: config.embedColor, description: "https://github.com/pixiys/devnull is the link, feel free to contribute!" } });
  }
 },
 alias: {
  usage: config.prefix + "alias [reset]|<name> <command>",
  desc: "Creates an alias for another command.",
  func: function (bot, msg, command, args) {
   if (!args[0]){ msg.channel.send({ embed: { color: config.embedColor, description: "Please specify arguments. see `!help alias`" } }); return;}
   if (args[0] == 'reset') {
    alias = require('./alias.json');
    msg.channel.send({ embed: { color: config.embedColor, description: "Reset aliases." } });
    return;
   }
   var al = {}; al[args.shift().match(new RegExp('^[^'+config.prefix+'].*', ''))] = args.join(' ');
   alias = Object.assign(alias, al);
   msg.channel.send({ embed: { color: config.embedColor, description: "Alias added: "+JSON5.stringify(al) } });
  }
 }
}
