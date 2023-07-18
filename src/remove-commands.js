require('dotenv').config();
const { REST, Routes } = require('discord.js')

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🟠 Deleting commands')
    
    const commands = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID))

    const promises = [];
    for (const command of commands) {
      const deleteUrl = `${Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)}/${command.id}`;

      console.log(`🤖 command: ${command.name} => to trash array`)

      promises.push(rest.delete(deleteUrl));
    }

    await Promise.all(promises);

    console.log('🟢 Commands were deleted')

  } catch(error) {
    console.log(error)
  }
})();