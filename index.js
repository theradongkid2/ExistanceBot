const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.token;
const fetch = require("node-fetch");
var counter = 0;
var tommyShut = false;
var tommySaid = false;
var lastUser = "819852916172914699"
var botHurtResponses = ["you cant catch me im the gingerbread man" , "do you dare to harm the seraphim?", "are you challenging me mortal", "how dare you try commit such war crimes", `e!warn @user bad boy`, "never going to happen", "haha, look where you are then look up.", "Would you like it if I did it to you?", "Perms are a privalege, not a right", "So you have chosen death", "do you honestly think that you could find a loophole in my code?", "Nice Try"];
var userHurtResponses = ["are you sure about this", "don't do it commander", "call lifeline on 13 11 14", "what are you? a masochist?", "please do not make me kill you", "calm down calm down, theres no need to do that", "no"]
function randomise(num){
  return Math.floor (Math.random() * (num - 1 + 1)) + 1;
}

function scheduleWarning(time, triggerThis){

  // get hour and minute from hour:minute param received, ex.: '16:00'
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  // create a Date object at the desired timepoint
  const startTime = new Date(); startTime.setHours(hour, minute, 0);
  const now = new Date();

  // increase timepoint by 24 hours if in the past
  if (startTime.getTime() < now.getTime()) {
    startTime.setHours(startTime.getHours() + 24);
  }

  // get the interval in ms from now to the timepoint when to trigger the alarm
  const firstTriggerAfterMs = startTime.getTime() - now.getTime();

  // trigger the function triggerThis() at the timepoint
  // create setInterval when the timepoint is reached to trigger it every day at this timepoint
  setTimeout(function(){
    triggerThis();
    setInterval(triggerThis, 24 * 60 * 60 * 1000);
  }, firstTriggerAfterMs);
}

//Terminal User Interface
client.on("ready", () => {
  console.log(`Existence Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`e!help - Having an Existential Crisis`);
  console.log("Servers:");
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name);
    });
  scheduleWarning('19:45', function() { client.channels.cache.get("699967983136800890").send("hi"); });
});

client.on("message", async message => {
  if(message.channel.id === "792392107414257745" && message.author.id === "413882334593417216") message.delete();
})

client.on("message", async message => {
  if(message.channel.id === "763567159871406080"){
    counter++;
    let x = randomise(5)
    if(counter % x === 0 && lastUser !== "819852916172914699"){
      message.channel.send("mm");
    }
    if(message.content !== "mm"){
      message.delete().catch(error => {
        if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
          console.error("");
        }
      });
      
      counter--
      if(message.author.bot) return;
      client.users.cache.get(message.author.id).send(`You sent a non mm in mm channel!!! This is your first warning :angry:!`);
      return
    }
    if(message.author.id === lastUser){
      message.delete()
      counter--
      if(message.author.bot) return;
      client.users.cache.get(message.author.id).send(`You pulled a double mm!!! This is your first warning :angry:!`);
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
    client.users.cache.get(message.author.id).send(`Management would kindly request for you to shut up. :)`);
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(tommySaid === false) return;
  if(message.author.id === "354170428727754753"){
    if(message.channel.id === "763567159871406080") return;
    var messageContent = message.content;
    var str = messageContent;
    let temp = str.split(" ").map(translatePigLatin);  
    var answer = temp.join(" ").toLowerCase();
      
    message.channel.send(`tommy said: ${answer}`);

    
    function translatePigLatin(str) {
      //gives us something to work with in array form
      let newStr = [...str];
      //regex to test words with for vowels
      let vowels = /[aeiou]/gi;
      
      //first line determines if the first character in the word is a vowel
    if (vowels.test(str[0]) === true) {
      return str + "way"; 
    } else if (str.search(vowels) > 0) { //if the word has a vowel but not the first letter
      var temp = str.slice(0, str.search(vowels)); //get all consonants to the first vowel
      newStr.push(temp, "ay"); //pushes those consonants and "ay" to the end of the word
      for (var i = 0; i < str.search(vowels); i++) { // for loop to remove consonants off the array
        newStr.shift();
      }
      return newStr.join("");
      
    }
    
    if (vowels.test(str) === false) {
      
      return str + "ay";
    }
    }
      
  }
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "help"){
    const args = message.content.split(' ');
    if(!args[1]){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Command Categories`,
        fields: [
          {
          name: `Moderator Commands`,
          value: `Use e!help mod`
          },
          {
            name: `Fun Commands`,
            value: `Use e!help fun`
            },
            {
              name: "Image Commands",
              value: "Use e!help image"
            },
              {
                  name: `Miscellaneous Commands`,
                  value: `Use e!help misc`
                  },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else if(args[1] === "mod"){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Moderator Commands`,
        fields: [
          {
          name: `Kick (Admins Only)`,
          value: `Usage: e!kick @user reason [used to kick members]`
          },
          {
            name: `Ban (Admins Only)`,
            value: `Usage: e!ban @user reason [used to ban members]`
            },
            {
              name: `Warn (Admins Only)`,
              value: `Usage: e!warn @user reason [used to warn members]`
              },
              {
                name: `Purge (Admins Only)`,
                value: `Usage: e!purge number (1-100) [used to clear/delete an amount of messages]`
                },
                {
                  name: `Mute (Admins Only)`,
                  value: `Usage: e!mute @user reason [used to mute members]`
                  },
                  {
                    name: `Unmute (Admins Only)`,
                    value: `Usage: e!unmute @user [used to unmute members]`
                    },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else if(args[1] === "fun"){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Fun Commands`,
        fields: [
          {
            name: `Useless Fact`,
            value: `Usage: e!fact [sends a random useless fact]`
            },
          {
            name: `Ship`,
            value: `Usage: e!ship person1 person2 [sends percentage of compatibility between two people/items]`
            },
          {
            name: `Meme`,
            value: `Usage: e!meme [sends a random meme]`
            },
            {
              name: `Say`,
              value: `Usage: e!say a sentence [used to repeat a message, and delete the commanding message (looks like bot speaks)]`
              },
                  {
                    name: `Quote`,
                    value: `Usage: e!quote [sends a random quote]`
                    }
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else if(args[1] === "diao"){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Tommy Diao Torture Commands`,
        fields: [
          {
          name: `Tommy Shut Up (Admins Only)`,
          value: `Usage: e!tommyshut [Responds with @RA1N, Shut Up whenever the man speaks. By default off.]`
          },
          {
            name: `Tommy Translation (Admins Only)`,
            value: `Usage: e!tommysaid [Responds with a piglatin translation of the man's message. By default off]`
            }
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else if(args[1] === "misc"){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Miscellaneous Commands`,
        fields: [
          {
            name: `Ping`,
            value: `Usage: e!ping [used to show latency/ping.]`
            },
            {
              name: `Poll`,
              value: `Usage: e!poll a question [sends a message with that question, with reacting with a thumbs up and down for a poll]`
              },
            {
              name: `User Statistics`,
              value: `Usage: e!userstats @user [shows a user's avatar, status and join/creation dates.]`
              },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else if(args[1] === "image"){
      const warnEmbed = {
        color: 0xFF69B4,
        title: `Help - Image Commands`,
        fields: [
          {
            name: `Birb`,
            value: `Usage: e!birb [sends a random bird picture]`
            },
          {
          name: `Shiba`,
          value: `Usage: e!shiba [sends a random shiba inu picture]`
          },
          {
            name: `Cat`,
            value: `Usage: e!cat [sends a random cat picture]`
            },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      message.channel.send({ embed: warnEmbed });
    } else{
      message.reply("Wrong Usage: Try e!help again...")
    }
  }





  if(command === "time"){
    var date = new Date()
    message.channel.send(`${date.getHours() + 11}:${date.getMinutes()}:${date.getSeconds()}`)
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
    if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 2 || deleteCount > 10000)
        return message.reply("Please provide a number between 2 and 10000 for the number of messages to delete");
      const fetched = await message.channel.messages.fetch({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  
     if(command === "kick") {
      if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
        if(member.id === "819852916172914699") return message.reply(botHurtResponses[randomise(11)]);
        if(member.id === message.author.id) return message.reply(userHurtResponses[randomise(6)]);
      if(!member.kickable) 
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
      let memberId = message.mentions.members.first().id
      let server = message.guild.name;
      const warnEmbed = {
        color: 0xFF0000,
        title: `Kick Log:`,
        thumbnail: {
          url: member.user.avatarURL
        },
        fields: [
          {
          name: `Kicked User: ${member.user.tag}`,
          value: `Kick Reason: ${reason}\n User Id: ${memberId}\n Moderator: ${message.author}\n Server: ${server}`
          },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      client.channels.cache.get("767659295230918676").send({ embed: warnEmbed });
    }
  
  
    if(command === "ban") {
      if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.bannable) 
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
      if(member.id === "819852916172914699") return message.reply(botHurtResponses[randomise(11)]);
      if(member.id === message.author.id) return message.reply(userHurtResponses[randomise(6)]);
      let Reason = args.slice(1).join(' ');
      if(!Reason) Reason = "No reason provided";
      
      await member.ban({reason: Reason})
        .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${Reason}`);
      let memberId = message.mentions.members.first().id
      let server = message.guild.name;
      const warnEmbed = {
        color: 0x000000,
        title: `Ban Log:`,
        thumbnail: {
          url: member.user.avatarURL
        },
        fields: [
          {
          name: `Banned User: ${member.user.tag}`,
          value: `Ban Reason: ${Reason}\n User Id: ${memberId}\n Moderator: ${message.author}\n Server: ${server}`
          },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      client.channels.cache.get("767659295230918676").send({ embed: warnEmbed });
    }
  

  if(command === "warn"){
    if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
  
    let moderator = message.member.user
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member){return message.channel.send("Please Specify a Member to Be Warned")}
    
    let memberId = message.mentions.members.first().id
    let reason = args.slice(1).join(' ');
    let server = message.guild.name;
      if(!reason){reason = "No reason provided"};
    
      const warnEmbed = {
        color: 0xFFFF00,
        title: `Warn Log:`,
        thumbnail: {
          url: member.user.avatarURL
        },
        fields: [
          {
          name: `Warned User: ${member.user.tag}`,
          value: `Warn Reason: ${reason}\n User Id: ${memberId}\n Moderator: ${moderator}\n Server: ${server}`
          },
        ],
        timestamp: new Date(),
          footer: {
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
          },
      };
      client.channels.cache.get("767659295230918676").send({ embed: warnEmbed });
      message.reply(`${member} has been warned.`);
      client.users.cache.get(memberId).send(`You have been warned in ${server} for ${reason}`);
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
              text: 'ExistenceBot by MasterKohder6',
              icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
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
    if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    if(tommyShut === true){
      tommyShut = false
      message.channel.send("Tommy can now speak without being told to shut up.")
    } else  if (tommyShut === false){
      tommyShut = true
      message.channel.send("Tommy can now shut up.")
    }
  }

  if(command === "tommysaid"){
    if(!message.member.roles.cache.some(r=>["・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    if(tommySaid === false){
      tommySaid = true
      message.channel.send("I will translate tommy's speech from now on.")
    } else  if (tommySaid === true){
      tommySaid = false
      message.channel.send("I will shut up now.")
    }
  }

  if(command === "quote"){
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      function rng(num){
        return Math.floor (Math.random() * (num - 1 + 1)) + 1;
      }
      const rng1 = rng(1643)
      var author, quote
      quote = `${data[rng1].text}`
      if(data[rng1].author === null) return
       author = `${data[rng1].author}`

      const inviteEmbed = {
      color: 0x9932CC,
      title: "Here's your Quote:",
      description: `${quote} - ${author}`,
      thumbnail: {
          url: 'https://cdn.discordapp.com/attachments/732914068075315271/820960779444551680/1xIxR8PZjbNqBtA-zU9wFYA.png',
      },
      
      timestamp: new Date(),
      footer: {
          text: 'ExistenceBot by MasterKohder6',
          icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
      },
    };
    message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "adminaboose"){
    if(!message.member.roles.cache.some(r=>[ "・ ── ・ Empress ・ ── ・", "・ ── ・ Archdukes ・ ── ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    var role = message.guild.roles.cache.find(role => role.id === "722234813041475696");
    message.member.roles.add(role);
    message.delete()
  }

  if(command === "pong"){
    message.channel.send("Ping! Hey you're supposed to say e!ping !!!")
  }

  if(command === "shiba"){
    fetch(`http://shibe.online/api/shibes`).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var link = data[0]
      const inviteEmbed = {
        color: 0x9932CC,
        title: "Heres Your Shiba Inu",
        image: {
            url: link,
        },
        
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
      };
      message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "cat"){
    fetch(`https://api.thecatapi.com/v1/images/search`).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var link = data[0].url
      const inviteEmbed = {
        color: 0x9932CC,
        title: "Heres Your Kitty Cat!",
        image: {
            url: link,
        },
        
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
      };
      message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "birb"){
    fetch(`https://some-random-api.ml/img/birb`).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var link = data.link
      const inviteEmbed = {
        color: 0x9932CC,
        title: "Heres Your Birb Pic!",
        image: {
            url: link,
        },
        
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
      };
      message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "fact"){
    fetch(`https://uselessfacts.jsph.pl/random.json?language=en`).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var fact = data.text
      const inviteEmbed = {
        color: 0x000000,
        title: "Did you Know?",
        description: `${fact}`,
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
      };
      message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "ship"){
    const args = message.content.split(' ');
    var person1 = args[1];
    var person2 = args[2];
    fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${person1}&sname=${person2}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "1c5b48d8cdmsh70098e9ec1b7eeap1dc730jsnb2f3060f371e",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com"
	    }
    }).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var messageItem = data.result;
      var percentages = data.percentage;
      if(percentages < 10){
        var emoji = ":flushed: :flushed: "
      } else if(percentages < 25){
        var emoji = ":face_vomiting: :face_vomiting:"
      } else if(percentages < 50){
        var emoji = " :smiling_face_with_3_hearts:"
      } else if(percentages < 75){
        var emoji = " :smiling_face_with_3_hearts: :kissing_heart: "
      } else if(percentages < 90){
        var emoji = ":heart_eyes: :heart_eyes: "
      } else if(percentages <= 100){
        var emoji = ":heart_eyes: :star_struck:"
      }
      const inviteEmbed = {
        color: 0xF9E3EF,
        title: `${person1} and ${person2} are ${percentages}% compatible ${emoji}`,
        description: `${messageItem}`,
        
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        }
      };
      message.channel.send({ embed: inviteEmbed });
    })
  }

  if(command === "meme"){
    fetch(`https://some-random-api.ml/meme`).then(function (response) {
	    // The API call was successful!
	    return response.json();
    }).then(function (data){
      var link = data.image
      var caption = data.caption
      const inviteEmbed = {
        color: 0x9932CC,
        title: caption,
        image: {
            url: link,
        },
        
        timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
      };
      message.channel.send({ embed: inviteEmbed });
    });
  }

  if(command === "executeorder69"){
    if(!message.member.roles.cache.some(r=>[ "・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = message.mentions.roles.first();
    message.mentions.members.cache.forEach(member => {
      member.roles.remove(Role).catch(e => console.error(e));
    });
    message.reply("Order Executed...")
  }

  if(command === "test"){
    if(!message.member.roles.cache.some(r=>[ "・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = "722234813041475696";
    message.member.roles.add(Role);
  }

  if(command === "testing"){
    if(!message.member.roles.cache.some(r=>[ "・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = "722234813041475696";
    message.member.roles.remove(Role);
  }

  if(command === "bubblesort"){
    const args = message.content.split(' ');
    var numArgs = args
    numArgs[0] = null;
    var numArgs = numArgs.map(Number);
    var Last = numArgs.length;
    var Swapped = true;
    while(Swapped){
      Swapped = false;
      var i = 1;
      while(i <= Last){
        if(numArgs[i] > numArgs[i + 1]){
          var Temp = numArgs[i];
          numArgs[i] = numArgs[i + 1];
          numArgs[i + 1] = Temp;
          Swapped = true
        }
        i++
      }
    }
    var sortedArgs = numArgs.join(" ");
    message.reply(`Here's Your Sorted Numbers, using Bubble Sort: ${sortedArgs}`);
  }

  if(command === "insertionsort"){
    var numArgs = message.content.split(' ')
    numArgs[0] = null;
    var Name = numArgs.map(Number);

    let First = 1;
    let Last = Name.length;
    let PositionOfNext = Last - 1;
    while(PositionOfNext >= First){
      let Next = Name[PositionOfNext];
      let Current = PositionOfNext;
      while(Current < Last && Next > Name[Current + 1]){
        Current++;
        Name[Current - 1] = Name[Current];
      }
      Name[Current] = Next;
      PositionOfNext--;
    }

    var sortedName = Name.join(" ");
    message.reply(`Here's Your Sorted Numbers, using Insertion Sort: ${sortedName}`);
  }

  if(command === "selectionsort"){
    var numArgs = message.content.split(' ')
    numArgs[0] = null;
    var Name = numArgs.map(Number);
    
    var EndUnsorted = Name.length;
    while(EndUnsorted > 1){
      var i = 1;
      var Max = Name[i];
      var PosMax = i;
      while(i <= EndUnsorted){
        i++;
        if(Name[i] > Max){
          Max = Name[i];
          PosMax = i;
        }
      }
      var Temp = Name[PosMax];
      Name[PosMax] = Name[EndUnsorted];
      Name[EndUnsorted] = Temp;
      EndUnsorted--;
    }

    var sortedName = Name.join(" ");
    message.reply(`Here's Your Sorted Numbers, using Selection Sort: ${sortedName}`);
  }

  if(command === "mute"){
    if(!message.member.roles.cache.some(r=>[ "・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = "766084383064850462";
    let member = message.mentions.members.first();
    let memberId = message.mentions.members.first().id
    let server = message.guild.name;
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided!"
    if(!member) return message.channel.send("Please specify member to be muted.")
    if(member.id === "819852916172914699") return message.reply(botHurtResponses[randomise(11)]);
    if(member.id === message.author.id) return message.reply(userHurtResponses[randomise(6)]);
    if(message.member.roles.cache.some(r=>[ "Muted"].includes(r.name)) )
        return message.reply(" give it a rest. My man is already muted. Why don't you try e!unmute");
    member.roles.add(Role);

    const warnEmbed = {
      color: 0xFFA500,
      title: `Mute Log:`,
      thumbnail: {
        url: member.user.avatarURL
      },
      fields: [
        {
        name: `Muted User: ${member.user.tag}`,
        value: `Warn Reason: ${reason}\n User Id: ${memberId}\n Moderator: ${message.author}\n Server: ${server}`
        },
      ],
      timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
    };
    client.channels.cache.get("767659295230918676").send({ embed: warnEmbed });
    client.users.cache.get(memberId).send(`You have been muted in ${server} for ${reason}`);
    message.reply(`${member} is now muted.`);
  }

  if(command === "unmute"){
    if(member.id === message.author.id) return message.reply("Nice Try Buddy.");
    if(!message.member.roles.cache.some(r=>[ "・ Emperor ・", "・ Empress ・", "・ Archduke ・", "Ruse"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    const Role = "766084383064850462";
    let member = message.mentions.members.first();
    let memberId = message.mentions.members.first().id
    let server = message.guild.name;
    if(!member) return message.channel.send("Please specify member to be unmuted.")
    if(!message.member.roles.cache.some(r=>[ "Muted"].includes(r.name)) )
        return message.reply(", the user you are trying to unmute is already unmuted! You can't give double the privalages to speak...");
    member.roles.remove(Role);
    const warnEmbed = {
      color: 0x00FF00,
      title: `Unmute Log:`,
      thumbnail: {
        url: member.user.avatarURL
      },
      fields: [
        {
        name: `Unmuted User: ${member.user.tag}`,
        value: `User Id: ${memberId}\n Moderator: ${message.author}\n Server: ${server}`
        },
      ],
      timestamp: new Date(),
        footer: {
            text: 'ExistenceBot by MasterKohder6',
            icon_url: 'https://cdn.discordapp.com/avatars/819852916172914699/2124f2224385be3a5c390e9c9e106985.png?size=2048',
        },
    };
    client.channels.cache.get("767659295230918676").send({ embed: warnEmbed });
    message.reply(`${member} is now unmuted.`);
  }

});

//Client Login
client.login(token);