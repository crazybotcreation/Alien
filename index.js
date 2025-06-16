const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

// Example: Trigger announcement with a !announce command
client.on('messageCreate', message => {
  if (message.content.startsWith('!announce') && message.member.permissions.has('Administrator')) {
    const announcement = message.content.replace('!announce ', '');
    message.channel.send(`📢 **Announcement:** ${announcement}`);
  }
});

client.login(process.env.TOKEN);
