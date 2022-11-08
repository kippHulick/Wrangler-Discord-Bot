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
      const pageLength = 10
      const queue = message.client.distube.getQueue(message)
      if (!(queue || queue?.songs)) return message.channel.send(`There is nothing playing dum dum!`)
      const { songs } = queue

      const embedFunc = () => {
        const pageArr = []
        let songArr = []
        let songNum = []
        let pageNum = 1
        for(const i of songs.keys()){
          let song = songs[i]
          if( (i + 1) % pageLength === 0 || i === songs.length ){
            const songField = () => {
              songString = `**Playing:** [${songs[0].name}](${songs[0].url})\nDuration: \`${songs[0].formattedDuration}\` - Requested by <@${song.user.id}>\n**Next Songs:**\n`
              songArr.forEach((songObj, j) => songString = `${songString}**${songNum[j]}.** [${songObj.name}](${songObj.url}) - \`${songObj.formattedDuration}\`\n`)
              return songString
            }

            songArr.push(song)
            songNum.push(i + 1)
            pageArr.push(
              new EmbedBuilder()
                .setColor(0x3498db)
                .setTitle('🎶 Server Queue 🎶')
                .setDescription(songField())
                .setFooter({ text: `Page ${pageNum}/${Math.floor(songs.length / pageLength)} • ${songs.length} Songs • Duration: ${queue.formattedDuration}` })
            )
            ++pageNum
            songArr = []
            songNum = []
          } else {
            songArr.push(song)
            songNum.push(i + 1)
          }
        }
        return pageArr
      }

      const { id } = message.member
      const embeds = embedFunc()
      const pages = {}
      pages[id] = pages[id] || 0
      const embed = embeds[pages[id]]
      const filter = (i) => i.user.id === id || id === '1023049554884575262'
      const time = 1000 * 60 * 1

      const getRow = (id) => {
        return new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('prevEmbed')
              .setStyle('Primary')
              .setEmoji('⏮')
              .setDisabled(pages[id] === 0)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId('trash')
              .setStyle('Danger')
              .setEmoji('🗑')
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId('nextEmbed')
              .setStyle('Primary')
              .setEmoji('⏭')
              .setDisabled(pages[id] === embeds.length - 1)
          )
      }

      reply = await message.reply({ embeds: [embed], components: [getRow(id)] }).catch(e => console.log(e))
      collector = reply.createMessageComponentCollector({ filter, time })

      collector.on('collect', btnInt => {
        if(!btnInt) return

        btnInt.deferUpdate()

        if(btnInt.customId !== `prevEmbed` && btnInt.customId !== `nextEmbed` && btnInt.customId !== `trash`) return

        if(btnInt.customId === `prevEmbed` && pages[id] > 0) --pages[id]

        if(btnInt.customId === `trash` && pages[id]) return reply.delete().catch(e => console.log(e))
        console.log('after trash button code');

        if(btnInt.customId === `nextEmbed` && pages[id] < embeds.length - 1) ++pages[id]

        reply.edit({ embeds: [embeds[pages[id]]], components: [getRow(id)] }).catch(e => console.log(e))
      })

      collector.on('end', col => {
        reply.channel.messages.fetch(reply.id)
        reply.delete().catch(e => console.log(e))
      })
    }
}