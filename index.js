const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// ✅ DEBUG: Log a masked version of the token to confirm it's loaded
if (!process.env.TOKEN) {
  console.error("❌ ERROR: Discord bot token (TOKEN) not found in environment!");
} else {
  console.log("✅ TOKEN found (masked):", process.env.TOKEN.slice(0, 5) + '*****');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (
    message.content.startsWith('!announce') &&
    message.member?.permissions.has('Administrator')
  ) {
    const announcement = message.content.replace('!announce ', '');
    message.channel.send(`📢 **Announcement:** ${announcement}`);
  }
});

client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ Login failed with error:", err.message);
});
