{
 timestamp: {
  usage: config.prefix + "timestamp",
  desc: "Responds with the current Js timestamp.",
  func: function (bot, msg, command, args) {
   msg.channel.send('`' + msg.createdTimestamp + '`');
  }
 },
 exec: {
  usage: config.prefix + "exec <code>",
  desc: "Executes Javascript code and responds with the result.",
  func: function (bot, msg, command, args) {
   if (msg.content.match(/```(js)?([\S\s]*)```/)) {
    var code = msg.content.match(/```(js)?([\S\s]*)```/)[0].replace(/```(js)?([\S\s]*)```/, (...x) => x[2]).replace(/\/\/.*\n/g, '\n').replace(/^\n+|\n+$/gm, '');
   } else { var code = args.join(' '); }
   var output = { console: [], result: null };
   var console = { log: s => { output.console.push(s) } };
   const vm = new VM({ console: 'redirect', timeout: 1000, sandbox: { output, console, Buffer:{}, Promise:{} }});
   try { output.result = vm.run(code); } catch (e) { output.result = e + ''; }
   if (!Array.isArray(output.console)) {
    output.console = [];
    output.result = 'TypeError: output.console was not an Array';
   }
   var o = "";
   if (output.console.length != 0) o += "**Console**\n```js\n" + output.console.slice(-16).map(x => {
    if (typeof x == 'object') { try { x = JSON5.stringify(x, null, 2) } catch (e) {} }
    return x;
   }).map(x => x += '').join('\n') + "```\n";
   try { output.result = JSON5.stringify(output.result); } catch (e) {}
   msg.channel.send(o + "**Result**\n```js\n" + output.result + "\n```");
  }
 }
}
