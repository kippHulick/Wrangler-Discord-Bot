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

    // const { client } = message
    // const { id } = message.member
    // const embeds = await client.embeds.get('queue').execute(client, queue)
    // const pages = {}
    // pages[id] = pages[id] || 0
    // const embed = embeds[pages[id]]
    // const filter = (i) => i.user.id === id || id === '1023049554884575262'
    // const time = 1000 * 60 * 2

    // const getRow = (id) => {
    //   return new ActionRowBuilder()
    //     .addComponents(
    //       new ButtonBuilder()
    //         .setCustomId('prevEmbed')
    //         .setStyle('Primary')
    //         .setEmoji('⏮')
    //         .setDisabled(pages[id] === 0)
    //     )
    //     .addComponents(
    //       new ButtonBuilder()
    //         .setCustomId('trash')
    //         .setStyle('Danger')
    //         .setEmoji('🗑')
    //     )
    //     .addComponents(
    //       new ButtonBuilder()
    //         .setCustomId('nextEmbed')
    //         .setStyle('Primary')
    //         .setEmoji('⏭')
    //         .setDisabled(pages[id] === embeds.length - 1)
    //     )
    // }

    // reply = await message.reply({ embeds: [embed], components: [getRow(id)] }).catch(e => console.log(e))
    // collector = reply.createMessageComponentCollector({ filter, time })

    // collector.on('collect', btnInt => {
    //   if(!btnInt) return

    //   btnInt.deferUpdate()

    //   if(btnInt.customId !== `prevEmbed` && btnInt.customId !== `nextEmbed` && btnInt.customId !== `trash`) return

    //   if(btnInt.customId === `prevEmbed` && pages[id] > 0) --pages[id]

    //   if(btnInt.customId === `trash` && pages[id]) {
    //     return collector.stop()
    //   }

    //   if(btnInt.customId === `nextEmbed` && pages[id] < embeds.length - 1) ++pages[id]

    //   reply.edit({ embeds: [embeds[pages[id]]], components: [getRow(id)] }).catch(e => console.log(e))
    // })

    // collector.on('end', async col => {
    //   // const messageId = await reply.channel.messages.fetch(reply.id)
    //   // if (!messageId) return
    //   // console.log({messageId});
    //   reply.delete().catch(e => console.log(e))
    // })
  }
}