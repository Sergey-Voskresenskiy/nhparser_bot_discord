const { consola } = require("consola");
const { Events } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    consola.success(`Event 'Ready': [ ${client.user.tag} online]`);
  }
}