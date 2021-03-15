const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.token;
var counter = 0;
var tommyShut = true;
var lastUser = "819852916172914699"

function randomise(num){
  return Math.floor (Math.random() * (num - 1 + 1)) + 1;
}

//Terminal User Interface
client.on("ready", () => {
  console.log(`Existence Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Having an Existential Crisis`);
  console.log("Servers:");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);
    });
});

client.on("ready", () => {
  var x
  while(x){
    var date = new Date()
    if(date.getHours() === 19 && date.getHours() === 25 && date.getSeconds() === 0){
      client.channels.get("699967983136800890").send("hi")
    }
  }
})
client.on("message", async message => {
  if(message.channel.id === "763567159871406080"){
    counter++;
    console.log(counter);
    let x = randomise(5)
    if(counter % x === 0) message.channel.send("mm");
    if(message.content !== "mm"){
      message.delete()
      client.users.get(message.author.id).send(`You sent a non mm in mm channel!!! This is your first warning :angry:!`);
      counter--
      return
    }
    if(message.author.id === lastUser){
      message.delete()
      client.users.get(message.author.id).send(`You pulled a double mm!!! This is your first warning :angry:!`);
      counter--
      return
    }
    lastUser = message.author.id;
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(tommyShut === false) return;
  if(message.author.id === "354170428727754753"){
    if(message.channel.id === "763567159871406080") return;
    message.reply("Shut Up")
    client.users.get(message.author.id).send(`Management would kindly request for you to shut up. :)`);
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "time"){
    var date = new Date()
    console.log(`${date.getHours()}:${date.getMinutes()}`)
  }
  if(command === "say") {
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(`${sayMessage}`);
  };
  if(command === "ping") {
      const m = await message.channel.send("Ping!");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  };
  if(command === "purge") {
    if(!message.member.roles.some(r=>["・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 2 || deleteCount > 10000)
        return message.reply("Please provide a number between 2 and 10000 for the number of messages to delete");
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  
     if(command === "kick") {
      if(!message.member.roles.some(r=>["・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.kickable) 
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  
    }
  
  
    if(command === "ban") {
      if(!message.member.roles.some(r=>["・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.bannable) 
        return message.reply("I cannot ban this usek! Do they have a higher role? Do I have ban permissions?");
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
  

  if(command === "warn"){
    if(!message.member.roles.some(r=>["・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
  
    let moderator = message.member.user
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member){return message.channel.send("Please Specify a Member to Be Warned")}
  
    let memberId = message.mentions.members.first().id
    let nickname = member ? member.displayName : null;
    let reason = args.slice(1).join(' ');
    let server = message.guild.name;
      if(!reason){reason = "No reason provided"};
    
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Warn Log:`,
        thumbnail: {
          url: member.user.avatarURL
        },
        fields: [
          {
          name: `Warned User: ${nickname}`,
          value: `Warn Reason: ${reason}\n User Id: ${memberId}\n Moderator: ${moderator}\n Server: ${server}`
          },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/0b94b139db25b2d606d6e50eef2f66bd.png?size=256',
          },
      };
      message.channel.send({ embed: warnEmbed });
      client.users.get(memberId).send(`You have been warned in ${server} for ${reason}`);
  };
  
  
  if(command === "userstats") {
    const args = message.content.split(' ');
      console.log(args);
      if(args.length > 2) {
        message.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);
      } else if(args.length === 2) {
        const member = message.mentions.members.size === 1 ? 
          message.mentions.members.first() :
          message.guild.members.cache.get(args[1]);
          let nickname = member ? member.displayName : null;
        if(member) {
          const userEmbed = {
            color: 0xFF69B4,
            title: `${nickname}`,
            thumbnail: {
              url: member.user.avatarURL
            },
            fields: [
              {
                name: "User Created On",
                value: member.user.createdAt.toLocaleString()
              },
              {
                name: "User Joined the Server On",
                value: member.joinedAt
              },
              {
                name: "User Status",
                value: member.presence.status
              }
            ],
          timestamp: new Date(),
          footer: {
              text: 'ExistenceBot',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/0b94b139db25b2d606d6e50eef2f66bd.png?size=256',
          },
          }
          
          message.channel.send({ embed: userEmbed });
        } else {
          message.channel.send(`I couldn't find that member with ID ${args[1]}`);
        }
        
      } else {
        message.channel.send("Include a user id/ping after k!userstats")
  }}
  
  if(command === "poll") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage).then(messageReaction =>{
        messageReaction.react('👍');
        messageReaction.react('👎'); 
    });
  }

  if(command === "tommyshut"){
    if(!message.member.roles.some(r=>["・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    if(tommyShut === true){
      tommyShut = false
      message.channel.send("Tommy can now speak without being told to shut up.")
    } else  if (tommyShut === false){
      tommyShut = true
      message.channel.send("Tommy can now shut up.")
    }
  }

  if(command === "adminaboose"){
    if(!message.member.roles.some(r=>[ "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    var role = message.guild.roles.find(role => role.name === "・ ── ・ Emperor ・ ── ・");
    message.member.addRole(role);
    message.delete()
  }

  if(command === "executeorder69"){
    if(!message.member.roles.some(r=>[ "・ ── ・ Emperor ・ ── ・", "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = message.mentions.roles.first();
    message.mentions.members.forEach(member => {
      member.removeRole(Role).catch(e => console.error(e));
    });
    message.reply("Order Executed...")
  }
});

//Client Login
client.login(token);