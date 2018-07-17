const Discord = require('discord.js');
const sparkclient = new Discord.Client();
const ddiff = require('return-deep-diff');
const token = 'NDY4NTgxMDY3OTI2OTI5NDE4.Di7QCQ.cJZuooE1kfHFIwAVdZACUh9eXKg';
const chalk = require('chalk');
var prefix = '!';
let ticketCounter = 1;
var serverName = 'AndrewBot';
require('./sparkutil/eventLoader')(sparkclient);


sparkclient.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log(ddiff(oldMember, newMember));
});

sparkclient.on('guildBanAdd', (guild, user) => {
    sparkclient.channels.get('456560247298064404').send(`${user.username} was just banned`)
});  

sparkclient.on('guildBanRemove', (guild, user) => {
    sparkclient.channels.get('456560247298064404').send(`${user.username} was just unbanned`)
});  

sparkclient.on('guildDelete', guild => {
    console.log(`I have left ${guild.name} at ${new Date()}`)
});

sparkclient.on('guildCreate', guild => {
    console.log(`I have joined ${guild.name} at ${new Date()}`)
});

sparkclient.on('guildMemberAdd', member => {
    sparkclient.channels.get('452548940177473560').send(`    
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬    
Welcome to **${member.guild.name}**, **${member}**
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`);
    member.addRole('454078889665495051')
    if(member.user.id == '427530949505581056') {
        member.addRole('454082932005404697')
    }

});

sparkclient.on('message', message => {

    if(message.author.bot) return;
    if(message.content.startsWith(prefix)){
//functions
function sparkEmbed(response, optionalName){
    var embedTitle = optionalName;
    if(optionalName == null){
        embedTitle = sparkcommand.toUpperCase();
    }
    message.channel.send({embed: {
        title: `✦ Andrew Bot - ${embedTitle} ✦`,
        color: 4259801,
        description: response,
        timestamp: new Date(),
        footer: {
            icon_url: sparkclient.user.avatarURL,
            text: "Created by SaltySpark#1719"
        }
    }});
}
//Everyone Commands
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const sparkcommand = args.shift().toLowerCase();

        if(sparkcommand == 'ping'){
            sparkEmbed(`Pong! \`${Date.now() - message.createdTimestamp} ms\` `)
        }
        else if(sparkcommand == 'help' || sparkcommand == 'commands') {
            message.channel.send({embed: {
                title: `✦ ${serverName} Bot - Help ✦`,
                color: 4259801,
                description:`Hey! I\'m ${serverName}\'s custom bot. Here is everything in what I can help you with:`,
                fields: [{
                    name: "Commands for Everyone!!!",
                    value: '`!help`\n`!owner`\n`!shop`\n`!ToS`\n`!ping`'
                  },
                  {
                    name: 'Adminstrator commands',
                    value: '`!status (status)`,\n`!roleadd (Role Name) (Role Color)`,\n`!announce (message)`'
                  }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: sparkclient.user.avatarURL,
                    text: `Andrew Bot • Created by SaltySpark#1719`
                }
            }});
        } 
        else if(sparkcommand == 'owner'){
            sparkEmbed(`Insecure#8468`);
        }
        else if(sparkcommand == 'shop'){
            sparkEmbed(`http://www.seaalternatives.com/`);
        }
        else if(sparkcommand == 'tos'){
            sparkEmbed(`__**Terms Of Service**__

            You must be 18 or have a legal guardian who is purchasing. You must fully agree/comprehend to SeaAlternatives.Com’s Terms Of Service
            
           **Products**
            
            Every price for the product(s) are set. We will never change the price unless/forced too. Coupon(s) and/or sales included. Only at those times will the product(s) pricing change. We will NOT give away free items. 
            
            **Acceptance** 
            
            By using SeaAlternatives.Com you abide to the Terms And Services as this is apart of our agreement. If you don’t accept/agree to the Acceptance Policy than please refrain from using SeaAlternatives.Com.
            
            **Delivery**
            
            Upon Delivery of the product(s) The information on how to access the product And/Or use it will be showed at the end of the Payment. 
            
            **Refund**
            
            On purchase of an item(s) there will be no refunds. Refunds will only be accepted if the product does not work. Following the Refund Policy, you must provide proof that the item(s) aren’t working. Along with that you must send visual proof of you trying to login/use the item. Order ID Must Be Included. You MUST contact support within 1 hour for a successful replacement. 
            
            **Chargebacks**
            
            Chargebacks will result in a scam file opened against you/With a blacklist from  our store/SeaAlternatives.Com. Along with that you will be banned from Our Discord Server and your purchased accounts will be leaked on countless websites.)
            `);
        }
//tickets
        if(sparkcommand == 'new'){
            var ticketName = 'ticket➨'+ticketCounter;
            sparkEmbed(`A new ticket has been created, Staff will be with you shortly.`, 'New Ticket');
            message.guild.createChannel(ticketName, 'text',  [
                {
                //@everyone perms
                id: message.guild.id,
                deny: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
              },
              {
                //ticket author perms
                id: message.author.id,
                allow: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
              },
                {
                //Support Team perms
                id: message.guild.roles.find('name', 'Support Team').id,
                allow: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES']
                }
            ]);
            ticketCounter++;
        }
        if(sparkcommand == 'close'){
            if(message.channel.name.startsWith('ticket➨')){
                message.channel.delete();
            }
            else{
                message.channel.send('This command can only be used in a ticket channel.');
            }
        }
//Moderator Commands
//Admin Commands 
        if(sparkcommand == 'roleadd'){
            var roleName = args[0];
            var roleColor = args[1];
            if(roleName == null || roleColor == null){
                message.channel.send('Please use the command in the correct format: +roleadd (Role Name) (Role Color)\`')
            }
            else if(message.member.hasPermission('ADMINISTRATOR') == false){
                message.channel.send('You do not have permission to do this command.')
            }
            else{
                message.guild.createRole({name: roleName, color: roleColor})
                message.channel.send(roleName + 'was created with the color' + roleColor);
            }
        }    
        else if(sparkcommand == 'send'){
            if(args[0] == null){
                message.channel.send('Please use the command in the correct format: \`~send (message)\`')
            }
            else if(message.member.hasPermission('ADMINISTRATOR') == false){
                message.channel.send('You do not have permission to use this command');
            }
            else{
                argoutput = args.join(' ');
                sparkclient.channels.get('454081743734046721').send(argoutput);
            }
        }   

        else if(sparkcommand == 'kick'){
            let kickedUser = message.mentions.users.first();
            let reason = args.slice(1).join(' ');
            if(reason == null){
                message.channel.send('Please enter a valid reason');
            }
            else if(message.member.hasPermission('ADMINISTRATOR') == false && message.member.id !== 434518162138988545 ){
                message.channel.send('You do not have permission to use this command.');
            }
            else{
                message.guild.member(kickedUser).kick();
                sparkclient.channels.get('455210445385498624').send(`${kickedUser} was kicked for ${reason}`);
            }
        }
//Only SaltySpark Commands
        if(sparkcommand == 'status'){
            if(message.member.id == '434518162138988545'){
                argoutput = args.join(' ');
                sparkclient.user.setActivity(argoutput);
            }
        else if(sparkcommand == 'calc'){
            var expres1 = args[0]
        }    
            else{
                message.channel.send('Your not SaltySpark :expressionless: This command is only meant for the owner of the bot, if you think this is an error please contact SaltySpark#1719')
            }
        }
    }
});

sparkclient.on('channelCreate', (channel) => {
    if(channel.type === 'text') {
        console.log(`A text channel by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}`)
    }
    else{
        console.log(`A voice channel by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}`)
    }
});

sparkclient.on('disconnect', () => {
    console.log(`You have been disconnected at ${new Date()}`);
});

var nToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
sparkclient.on('debug', debugString =>{
    console.log(chalk.cyan(debugString.replace(nToken, 'that was redacted')));
});
sparkclient.on('error', errorString =>{
    console.log(chalk.red(errorString.replace(nToken, 'that was redacted')));
});
sparkclient.on('warn', warnString =>{
    console.log(chalk.yellow(warnString.replace(nToken, 'that was redacted')));
});

sparkclient.login(token);
