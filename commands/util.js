{
	warn: {
  usage: config.prefix + "warn <@uid> <reason>",
  desc: "Warns a specified user with a timestamp",
  func: function(bot, msg, command, args) {
   
   const reason = args.slice(1).join(' ')
   let member = msg.mentions.members.first()
   const warning = msg.guild.roles.find("name", "warning")
   const author = msg.author.id
   
   msg.channel.send({
    embed: {
     title: "Warning",
     color: config.embedColor,
     description: `User ` + member + ` was warned by ` + `<@` + author + `>` + ` for ` + reason + `at` + '`' + msg.createdTimestamp + '`'
    }
   });
   member.addRole(warning)
  }
 },
}
