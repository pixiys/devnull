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
 magic8ball: {
  usage: config.prefix + "magic8ball <question>",
  desc: "Magic 8-ball",
  func: function(bot, msg, command, args) {

   if (!args[2]) return msg.reply("Please ask a full question!");
   var sayings = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

   var result = Math.floor((Math.random() * sayings.length) + 0);

   msg.channel.send({
     embed: {
     title: "The Magic 8-ball says",
     color: config.embedColor,
     description: sayings[result]
    }
   });
  }
 }
}
