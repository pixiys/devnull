{
	warn: {
  usage: config.prefix + "warn <@uid> <reason>",
  desc: "Warns a specified user",
  func: function(bot, msg, command, args) {
   
   let reason = args.slice(1).join(' ')
   let member = msg.mentions.members.first()
   let warning = msg.guild.roles.find('name', config.warningRole)
   let author = msg.author.id
   let wchannel = client.channels.find('name', config.actionsChannel)
   
   if(!reason){reason = "no reason"}
   
   wchannel.send({
    embed: {
     title: "Warning",
     color: config.embedColor,
     description: `User ` + member + ` was warned by ` + `<@` + author + `>` + ` for ` + reason + ` at ` + '`' + msg.createdTimestamp + '`'
    }
   });
   member.addRole(warning)
  }
 },
 kick: {
  usage: config.prefix + "kick <@uid> <reason>",
  desc: "Kicks a specified user.",
  func:function(bot, msg, command, args) {
		 
   let member = msg.mentions.members.first()
   let reason = args.slice(1).join(' ')
   let author = msg.author.id
   let wchannel = client.channels.find("name", config.actionsChannel)
		 
   if(!reason){reason = "no reason"}
		 
   wchannel.send({
    embed: {
     title: "Kick",
     color: config.embedColor,
     description: `User ` + member + ` was kicked by ` + `<@` + author + `>` + ` for ` + reason + ` at ` + '`' + msg.createdTimestamp + '`'
    }
   });
   member.kick(reason)
   }
 },
 ban: {
  usage: config.prefix + "ban <@uid> <reason>",
  desc: "Bans a specified user.",
  func: function(bot, msg, command, args) {
		 
   let member = msg.mentions.members.first()
   let reason = args.slice(1).join(' ')
   let author = msg.author.id
   let wchannel = client.channels.find("name", config.actionsChannel)
		 
   if(!reason){reason = "no reason"}
		 
   wchannel.send({
    embed: {
     title: "BAN HAMMER",
     color: config.embedColor,
     description: `User ` + member + ` was banned by ` + `<@` + author + `>` + ` for ` + reason + ` at ` + '`' + msg.createdTimestamp + '`'
    }
   });
   member.ban(reason)
  }
 }
}
