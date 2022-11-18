const { 
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder
} = require("discord.js")

module.exports = {
  data: {
    "name": 'queue',
    "aliases": ['q'],
  },

  execute: async (message, args) => {
    const queue = message.client.distube.getQueue(message)
    if (!(queue || queue?.songs)) return message.channel.send(`There is nothing playing dum dum!`)
    const pagination = await message.client.embeds.get('pagination').execute(message, queue)
  }
}