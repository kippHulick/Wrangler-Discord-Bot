const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  ComponentType
} = require("discord.js")

module.exports = {
  data: {
    "name": 'playskip',
    "aliases": ['ps'],
    "inVoiceChannel": true,
  },
  
  execute: async (message, args) => {
    const { client } = message
    console.log('Playing!')
    const string = args.join(' ')

    if(string.slice(0, 4) === 'http'){
      client.distube.play(
        message.member.voice.channel, string, {
          textChannel: message.channel,
          member: message.member,
          message,
          skip: true
        }
      )
      return
    }

    if(!string) return message.channel.send('You need a song to play dum dum!')

    const songs = await client.distube.search(string)

    const embed = await client.embeds.get('search').execute(songs, client)

    if (!string) return message.channel.send(`Please enter a song url or query to search.`)
    const res = await message.reply({ embeds: [embed], ephemeral: true }).catch(e => console.log(e))//, components: [buttons1, buttons2]
    // const reply = await message.awaitMessageComponent(opt).then(i => console.log(i))
    res.react(`1️⃣`)
    res.react(`2️⃣`)
    res.react(`3️⃣`)
    res.react(`4️⃣`)
    res.react(`5️⃣`)
    
    const filter = (reaction, user) => {
        return user.id === message.member.id
    }

    const added = []

    const helper = async (idx) => {
      client.distube.play(
        message.member.voice.channel, songs[idx], {
          textChannel: message.channel,
          member: message.member,
          message,
          skip: true
        }
      )
      const totalDuration = added.reduce((acc, obj) => (acc + Number(obj.duration)), 0)
      const total = new Date(totalDuration * 1000).toISOString().substr(11, 8);
      editFields = () => added.map((song, i) => ({ name: `${i + 1} - ${song.formattedDuration}`, value: song.name }))
      await res.edit({ embeds: [ 
        new EmbedBuilder()
          .setColor(client.colors.primary)
          .setTitle(`You have skipped the current song for: | ${total}`)
          .addFields(editFields())
      ]})
      res.reactions.removeAll().catch(e => console.log(e))
      added.push(songs[idx])
    }

    const collector = res.createReactionCollector({ filter, time: 10000 })
    collector.on('collect', (reaction, user) => {
      const emoji = reaction.emoji.name

      switch (emoji) {
        case '1️⃣':
          helper(0)
          break

        case '2️⃣':
          helper(1)
          break

        case '3️⃣':
          helper(2)
          break

        case '4️⃣':
          helper(3)
          break

        case '5️⃣':
          helper(4)
          break
      }
    })

    collector.on('end', async (collected) => {
      if (added.length === 0) return res.delete().catch(e => console.log(e))
    })
  }
}