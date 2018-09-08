{
 warn: {
  usage: config.prefix + "warn <@uid> <reason>",
  desc: "Warns a specified user with a timestamp",
  func: function(bot, msg, command, args) {
   
   const reason = args.slice(1).join(' ')
   let member = msg.mentions.members.first()
   const warning = msg.guild.roles.find("name", "warning")
   const author = msg.author.id
   const wchannel = client.channels.find('name', "warnings")
   
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
		 
   const member = msg.mentions.members.first()
   const reason = args.slice(1).join(' ')
   const author = msg.author.id
   const wchannel = client.channels.find('name', "warnings")
		 
   wchannel.send({
    embed: {
     title: "Kick",
     color: config.embedColor,
     description: `User ` + member + ` was kicked by ` + `<@` + author + `>` + ` for ` + reason + ` at ` + '`' + msg.createdTimestamp + '`'
    }
   });
   member.kick(reason)
   }
  }
 }
}
