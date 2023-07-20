const { EmbedBuilder } = require("discord.js");

const listToString = (list) => {
  return list.length > 1 ? list.join(", ") : list[0];
};

module.exports = (doujin) => {
  const embedFields = [];

  Object.keys(doujin).forEach((field) => {
    switch (field) {
      case "id": 
        break;
        embedFields.push({
          name: "Id",
          value: `#${doujin.id}`,
          inline: true,
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
        break;
        doujin[field].length &&
          embedFields.push({
            name: "Characters",
            value: `${listToString(doujin.characters)}`,
          });
        break;
      case "artists":
        break;
        doujin[field].length &&
          embedFields.push({
            name: "Artists",
            value: `${listToString(doujin.artists)}`,
          });
        break;
      case "parodies":
        break;
        doujin[field].length &&
          embedFields.push({
            name: "Parodies:",
            value: `${listToString(doujin.parodies)}`,
          });
        break;
      case "categories":
        break;
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
      url: "https://nhentai.net",
    })
    .setDescription(`${doujin.originalTitle}`)
    .setURL(doujin.url)
    .setColor(0xed2553)
    .addFields(...embedFields)
    .setThumbnail(
      "https://clipground.com/images/nhentai-logo-3.jpg" /*doujin.cover*/
    )
    .setImage(
      "https://clipground.com/images/nhentai-logo-3.jpg" /*doujin.images.pages[0]*/
    )
    .setFooter({
      text: `Artists: ${listToString(doujin.artists)}`,
      iconURL: "https://clipground.com/images/nhentai-logo-3.jpg",
    }));
};