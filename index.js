const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.token;


//Terminal User Interface
client.on("ready", () => {
  console.log(`Existence Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Having an Existential Crisis`);
  console.log("Servers:");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);
    });
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "say") {
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(`${sayMessage}`);
  }
  if(command === "ping") {
      const m = await message.channel.send("Ping!");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
});

//Client Login
client.login(token);