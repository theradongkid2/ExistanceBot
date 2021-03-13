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

//Client Login
client.login(token);