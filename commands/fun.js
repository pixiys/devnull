{
  coinflip:{
	usage: config.prefix+"coinflip",
	desc: "Flips a coin.",
	func: function (bot,msg,command,args){
	 function doRandHT(){
	 var rand = ['Heads!','Tails!']
	 
	 return rand[Math.floor(Math.random()*rand.length)];
}
let coinEmbed = new Discord.RichEmbed() 
	.setDescription("~COINFLIP~")
	.setColor(config.embedColor)
	.addField("The winner is "+doRandHT());
		
	msg.channel.send(coinEmbed);
  }
 },
}
