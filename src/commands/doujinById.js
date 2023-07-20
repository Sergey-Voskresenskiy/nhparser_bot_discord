const { SlashCommandBuilder } = require('discord.js');
const { NHentai } = require("@shineiichijo/nhentai-ts");

const Embed = require("../helpers/embed");
const nhentai = new NHentai(process.env.NHENTAI_SITE && { site: process.env.NHENTAI_SITE })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('doujin')
    .setDescription('Replies with doujin by id')
    .addNumberOption(option =>
      option.setName('id')
        .setDescription('Type doujin id')
        .setRequired(true)),

  async execute(interaction) {
    try {
      console.log(interaction)

      if(await nhentai.validate(interaction.options.getNumber('id'))) {
        const doujin = await nhentai.getDoujin(
          interaction.options.getNumber('id')
        );
        await interaction.reply({ embeds: [Embed(doujin)] });
      } else {
        await interaction.reply(`🤡`)
      }

    } catch (error) {
      await interaction.reply(
        `[#${interaction.options.getNumber('id')}]: ${error}`
      );
    }
  },
}