{
 help: {
  usage: config.prefix + "help [command]",
  desc: "responds with the usage and description for a command",
  func: function (bot, msg, command, args) {
   if (args[0]) args[0] = args[0].replace(new RegExp("^" + config.prefix), '');
   if (cmd[args[0]]) {
    const helpEmbed = {
     title: config.prefix + args[0],
     color: config.embedColor,
     fields: [{
      name: "Usage",
      value: cmd[args[0]].usage
     }, { name: "Description", value: cmd[args[0]].desc }]
    };
    msg.channel.send({ embed: helpEmbed });
   } else if (!args[0]) {
    var helpEmbed = { title: config.name + " Command Help", color: config.embedColor, fields: [] };
    Object.keys(cmd).map(x => { helpEmbed.fields.push({ name: cmd[x].usage, value: cmd[x].desc }); });
    msg.author.send({ embed: helpEmbed });
   } else {
    msg.channel.send({ embed: { color: config.embedColor, description: "no command " + args[0] } });
   };
  }
 },
 ping: {
  usage: config.prefix + "ping",
  desc: "responds with the time, and latency between the server and discord",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { title: "Pong", color: config.embedColor, fields: [{ name: "Time", value: moment().format('LTS') }, { name: "Latency", value: Math.round(client.ping) + "ms" }] } });
  }
 },
 github: {
  usage: config.prefix + "github",
  desc: "responds with the github link for this bot",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { color: config.embedColor, description: "https://github.com/pixiys/devnull is the link, feel free to contribute!" } });
  }
 }
}
