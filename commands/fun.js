{
 flip: {
  usage: config.prefix + "flip",
  desc: "Flips a coin.",
  func: function(bot, msg, command, args) {
   msg.channel.send({
    embed: {
     title: "Coinflip",
     color: config.embedColor,
     description: "The winner is " + ((Math.random() >= 0.5) ? "Heads!" : "Tails!")
    }
   });
  }
 },
 quote: {
  usage: config.prefix + "quote",
  desc: "Quote of the day.",
  func: function(bot, msg, command, args) {
   msg.channel.send({
    embed: {
     title: "Quote",
     color: config.embedColor,
     description: fortune.fortune()
    }
   });
  }
 },
 ask: {
  usage: config.prefix + "ask <question>",
  desc: "Responds to the question you ask it.",
  func: function(bot, msg, command, args) {
   if (!args[1]) return msg.reply("Please ask a full question!");
   var sayings = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes","Most likely", "Outlook good", "Yes",
                  "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it",
                  "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
   msg.channel.send({
     embed: {
     title: config.name+" says",
     color: config.embedColor,
     description: sayings[Math.floor((Math.random() * sayings.length))]
    }
   });
  }
 }
}
