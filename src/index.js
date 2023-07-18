require('dotenv').config();
const { NHentai } = require("@shineiichijo/nhentai-ts");
const {
  Client,
  IntentsBitField,
} = require('discord.js');

const Embed = require('./embed');

const nhentai = new NHentai()
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', c => {
  console.log(`🟢 ${c.user.tag} online`);
})

client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return

  switch (interaction.commandName) {
    case 'nhb_ping':
      interaction.reply('Pong!');
      break;
    case 'nhb_random':
      try {
        const random_doujin = await nhentai.getRandom()
        interaction.reply({ embeds: [Embed(random_doujin)] })
      } catch (error) {
        interaction.reply(`Something went wrong, try again later! | ${error}`);
      }
      break;
    case 'nhb_doujin':
      try {
        const doujin = await nhentai.getDoujin(interaction.options.get('digits').value)
        interaction.reply({ embeds: [Embed(doujin)] })
      } catch (error) {
        interaction.reply(`[#${interaction.options.get('digits').value}]: ${error}`);
      }
      break;
    default:
      break;
  }
});

client.login(process.env.TOKEN);
