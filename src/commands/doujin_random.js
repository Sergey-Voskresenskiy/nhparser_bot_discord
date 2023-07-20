const { SlashCommandBuilder } = require('discord.js');
const { NHentai } = require("@shineiichijo/nhentai-ts");

const Embed = require("../helpers/embed");
const nhentai = new NHentai(process.env.NHENTAI_SITE && { site: process.env.NHENTAI_SITE })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random_doujin')
    .setDescription('Replies with random doujin'),

  async execute(interaction) {
    try {
      const doujin = await nhentai.getRandom();
      await interaction.reply({ embeds: [Embed(doujin)] });
    } catch (error) {
      await interaction.reply(
        `[#${interaction.options.getNumber('id')}]: ${error}`
      );
    }
  },
}