const { SlashCommandBuilder } = require("discord.js");
const { NHentai } = require("@shineiichijo/nhentai-ts");
const { consola } = require("consola");

const Embed = require("../helpers/embed");
const Attachment = require("../helpers/attachment");

const nhentai = new NHentai(
  process.env.NHENTAI_SITE && { site: process.env.NHENTAI_SITE }
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doujin")
    .setDescription("Replies with doujin by id")
    .addNumberOption((option) =>
      option.setName("id").setDescription("Type doujin id").setRequired(true)
    )
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
      if (await nhentai.validate(interaction.options.getNumber("id"))) {
        await interaction.deferReply({ ephemeral: interaction.options.getBoolean('ephemeral') });

        const doujin = await nhentai.getDoujin(
          interaction.options.getNumber("id")
        );
        const embed = Embed(doujin)

        if (interaction.options.getBoolean('pdf')) {
          await interaction.editReply({
            embeds: [ embed ],
            files: [ await Attachment(doujin) ],
          });
        } else {
          await interaction.editReply({ embeds: [ embed ] });
        }
      } else {
        await interaction.editReply(`🤡 Is there something wrong`);
      }
    } catch (error) {
      consola.error(error)
      await interaction.editReply(
        `[#${interaction.options.getNumber("id")}]: ${error}`
      );
    }
  },
};
