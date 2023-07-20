const { AttachmentBuilder } = require("discord.js");
const { existsSync } = require("node:fs");

module.exports = async (doujin) => {
  let pdf = `./pdf/${doujin.title.replaceAll(" ", "")}.pdf`;

  if (!existsSync(pdf)) {
    pdf = await doujin.images.PDF(
      `./pdf/${doujin.title.replaceAll(" ", "")}.pdf`
    );
  }

  return (attachment = new AttachmentBuilder(pdf, {
    name: `${doujin.title.replaceAll(" ", "")}.pdf`,
    description: doujin.title,
  }));
};
