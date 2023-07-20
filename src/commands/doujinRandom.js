const { SlashCommandBuilder } = require('discord.js');
const { NHentai } = require("@shineiichijo/nhentai-ts");
const { consola } = require("consola");

const Embed = require("../helpers/embed");
const Attachment = require("../helpers/attachment");

const nhentai = new NHentai(process.env.NHENTAI_SITE && { site: process.env.NHENTAI_SITE })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random_doujin')
    .setDescription('Replies with random doujin')
    .addBooleanOption((option) =>
      option
        .setName("pdf")
        .setDescription("Generate or send pdf file")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Whether or not the echo should be ephemeral")
        .setRequired(true)
    ),
  
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: interaction.options.getBoolean('ephemeral') })

      const doujin = await nhentai.getRandom();
      const embed = Embed(doujin)

      if (interaction.options.getBoolean('pdf')) {
        await interaction.editReply({
          embeds: [ embed ],
          files: [ await Attachment(doujin) ],
        });
      } else {
        await interaction.editReply({ embeds: [ embed ] });
      }
    } catch (error) {
      consola.error(error)
      await interaction.editReply(
        `[#${interaction.options.getNumber('id')}]: ${error}`
      );
    }
  },
}