{
 color:{
  usage: config.prefix + "color <color>",
  desc: "gives you the role of a given color",
  help: "available colors include: none, "+Object.keys(config.colorRoles).join(', '),
  func: function(bot, msg, command, args){
   if (!msg.member){msg.channel.send({ embed: { color: config.embedColor, description: "You must be in a server to use this command"}});return;}
   var colorRoles  = msg.member.guild.roles.filter(x=>Object.values(config.colorRoles).indexOf(x.name) > -1);
   if (!args[0]){msg.channel.send({ embed: { color: config.embedColor, description: `Please specify a color. see \`!help color\``}});return;}
   if (args[0] == 'none'){msg.member.removeRoles(colorRoles);msg.channel.send({ embed: { color: config.embedColor, description: `Removed ${msg.member.displayName}\'s color`}});return;}
   var colorChoose = colorRoles.filter(x=>{return (config.colorRoles[args[0].toString()] == x.name)}).first();
   if (colorChoose == undefined){msg.channel.send({ embed: { color: config.embedColor, description: `Color \`${args[0]}\` not found, see \`!help color\``}});return;}
   msg.member.removeRoles(colorRoles);
   msg.member.addRole(colorChoose);
   msg.channel.send({ embed: { color: config.embedColor, description: `Changed ${msg.member.displayName}\'s color to \`${args[0]}\``}});
  }
 }
}
