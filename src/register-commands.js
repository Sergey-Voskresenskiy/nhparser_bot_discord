require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
  {
    name: "nhb_random",
    description: "Replies wiht random doujin",
  },
  {
    name: "nhb_ping",
    description: "Pong!",
  },
  {
    name: 'nhb_doujin',
    description: 'Replies with doujin',
    options: [{
      name: 'digits',
      description: 'Type doujin digits',
      type: ApplicationCommandOptionType.Number,
      required: true,
    }],
  },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🟠 Registering commands')
    await rest.put(
      Routes.applicationGuildCommands( process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    )
    console.log('🟢 Commands were registered')

  } catch(error) {
    console.log(error)
  }
})();