{
 help: {
  usage: config.prefix + "help [command]",
  desc: "Responds with the usage and description for a command.",
  func: function (bot, msg, command, args) {
   if (args[0]) args[0] = args[0].replace(new RegExp("^" + config.prefix), '');
   if (cmd[args[0]]) {
    var helpEmbed = {
     title: config.prefix + args[0],
     color: config.embedColor,
     fields: [{
      name: "Usage",
      value: cmd[args[0]].usage
     }, { 
      name: "Description", 
      value: cmd[args[0]].desc+(permissions[args[0]]?' (requires permission)':'')
     }]
    };
    if (cmd[args[0]].help) helpEmbed.fields.push({name: "Extra", value: cmd[args[0]].help});
    msg.author.send({ embed: helpEmbed });
   } else if (!args[0]) {
    var helpEmbed = { title: config.name + " Command Help", color: config.embedColor, fields: [] };
    Object.keys(cmd).map(x => { helpEmbed.fields.push({ name: cmd[x].usage, value: cmd[x].desc+(permissions[x]?' (requires permission)':'') }); });
    msg.author.send({ embed: helpEmbed });
   } else {
    msg.channel.send({ embed: { color: config.embedColor, description: "no command " + args[0] + '.' } });
   };
  }
 },
 ping: {
  usage: config.prefix + "ping",
  desc: "Responds with the time, and latency between the server and Discord.",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { title: "Pong", color: config.embedColor, fields: [{ name: "Time", value: moment().format('LTS') }, { name: "Latency", value: Math.round(client.ping) + "ms" }] } });
  }
 },
 github: {
  usage: config.prefix + "github",
  desc: "Responds with the Github link for this bot.",
  func: function (bot, msg, command, args) {
   msg.channel.send({ embed: { color: config.embedColor, description: "https://github.com/pixiys/devnull is the link, feel free to contribute!" } });
  }
 },
 alias: {
  usage: config.prefix + "alias [reset]|<name> <command>",
  desc: "Creates an alias for another command.",
  func: function (bot, msg, command, args) {
   if (!args[0]){ msg.channel.send({ embed: { color: config.embedColor, description: "Please specify arguments. see `!help alias`" } }); return;}
   if (args[0] == 'reset') {
    alias = require('./alias.json');
    msg.channel.send({ embed: { color: config.embedColor, description: "Reset aliases." } });
    return;
   }
   var al = {}; al[args.shift().match(new RegExp('^[^'+config.prefix+'].*', ''))] = args.join(' ');
   alias = Object.assign(alias, al);
   msg.channel.send({ embed: { color: config.embedColor, description: "Alias added: "+JSON5.stringify(al) } });
  }
 },
 books: {
  usage: config.prefix + "books <regexr> [page]",
  desc: "Responds with all matching books in <https://please.dont-hack.me/hacking/books/>",
  init: ()=>{
   global.books = [];
   request({
    uri: "https://please.dont-hack.me/hacking/books/",
    }, function(error, response, body) {
    var $ = cheerio.load(body);
    $("body pre a").each(function() {
     var text = $(this).text();
     var href = "https://please.dont-hack.me/hacking/books/"+$(this).attr("href");
     global.books.push({title:text, link:href});
    });
   });
  },
  func: function (bot, msg, command, args) {
   args[1]=isNaN(parseInt(args[1]))?0:parseInt(args[1]);
   console.log(args[1])
   try{
    if (!args[0]) throw err;
    var fbooks = global.books.filter(x=>x.title.match(new RegExp(args[0], 'ig'))), split = [];
    if (fbooks.length == 0) throw err;
    for (var i=0; i<fbooks.length; i+=10) split.push(fbooks.map(x=>'['+x.title+']('+x.link+')').slice(i,i+10));
    msg.channel.send({ embed: { title: "Books", color: config.embedColor, description: "Found "+fbooks.length+" book(s) and split into "+split.length+" pages"} });
    msg.channel.send({ embed: { color: config.embedColor, description: "page "+args[1]+':\n'+(split[args[1]]?split[args[1]].join('\n'):'')} });
   } catch (e) {
    console.log(e)
    msg.channel.send({ embed: { title: "Books", color: config.embedColor, description: "Found 0 books\n"} }); 
   }
  }
 }
}
