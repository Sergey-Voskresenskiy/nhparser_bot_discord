const { consola } = require("consola");
const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    consola.info(" Event 'InteractionCreate'");

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      consola.error(
        `No command matching [${interaction.commandName}] was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      consola.error(`Error executing [${interaction.commandName}]`);
      consola.error(error);
    }
  },
};
