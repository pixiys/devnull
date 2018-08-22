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
 }
}
