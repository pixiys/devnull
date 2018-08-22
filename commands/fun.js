{
 flip: {
  usage: config.prefix + "flip",
  desc: "Flips a coin.",
  func: function(bot, msg, command, args) {
   function doRandHT() {
    var rand = ['Heads!', 'Tails!']

    return rand[Math.floor(Math.random() * rand.length)];
   }
   msg.channel.send({
    embed: {
     title: "~COINFLIP~",
     color: config.embedColor,
     fields: [{
      name: "The winner is",
      value: doRandHT()
     }]
    }
   });
  }
 }
}
