const { EmbedBuilder } = require("discord.js");

const listToString = (list) => {
  return list.length > 1 ? list.join(", ") : list[0];
};

module.exports = (doujin) => {
  const embedFields = [];

  Object.keys(doujin).forEach((field) => {
    switch (field) {
      case "id": 
        embedFields.push({
          name: "Id",
          value: `#${doujin.id}`,
        });
        break;
      case "languages":
        doujin[field].length &&
          embedFields.push({
            name: "Languages",
            value: `${listToString(doujin.languages)}`,
          });
        break;
      case "tags":
        doujin[field].length &&
          embedFields.push({
            name: "Tags",
            value: `${listToString(doujin.tags)}`,
          });
        break;
      case "characters":
        doujin[field].length &&
          embedFields.push({
            name: "Characters",
            value: `${listToString(doujin.characters)}`,
            inline: true,
          });
        break;
      case "parodies":
        doujin[field].length &&
          embedFields.push({
            name: "Parodies:",
            value: `${listToString(doujin.parodies)}`,
          });
        break;
      case "categories":
        doujin[field].length &&
          embedFields.push({
            name: "Categories",
            value: `${listToString(doujin.categories)}`,
          });
        break;
      case "images":
        doujin[field].length &&
          embedFields.push({
            name: "Pages",
            value: `${doujin.images.pages.length}`,
          });
        break;
      default:
        break;
    }
  });

  return (embed = new EmbedBuilder()
    .setTimestamp()
    .setTitle(`#${doujin.id} ${doujin.title}`)
    .setAuthor({
      name: "by NHentai",
      iconURL: "https://clipground.com/images/nhentai-logo-3.jpg",
      url: process.env.NHENTAI_SITE ? process.env.NHENTAI_SITE : "https://nhentai.net",
    })
    .setDescription(`${doujin.originalTitle}`)
    .setURL(doujin.url)
    .setColor(0xed2553)
    .addFields(...embedFields)
    .setThumbnail(
      doujin.cover
    )
    .setImage(
      doujin.images.pages[0]
    )
    .setFooter({
      text: `Artists: ${listToString(doujin.artists)}`,
      iconURL: "https://clipground.com/images/nhentai-logo-3.jpg",
    }));
};
