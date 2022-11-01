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
        "name": 'playtop',
        "aliases": ['pt'],
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
            position: 1
          }
        )
        return
      }
  
      if(!string) return message.channel.send('You need a song to play dum dum!')
  
      const songs = await client.distube.search(string)
  
      const fields = () => {
        const fields = []
        for(i = 1; i <= 5; i ++){
          fields.push({
            name: `${i}`,
            value: `${songs[i - 1].name}`,
          })
        }
        return fields
      }
  
      const embed = new EmbedBuilder()
          .setColor(0x3498db)
          .setTitle('Pick an option below!')
          .addFields(fields())
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
  
      const helper = (idx) => {
        client.distube.play(
          message.member.voice.channel, songs[idx], {
            textChannel: message.channel,
            member: message.member,
            message,
            position: added.length + 1
          }
        )
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
        const totalDuration = added.reduce((acc, obj) => (acc + Number(obj.duration)), 0)
        const total = new Date(totalDuration * 1000).toISOString().substr(11, 8);
        editFields = () => added.map((song, i) => ({ name: `${i + 1} - ${song.formattedDuration}`, value: song.name }))
        await res.edit({ embeds: [ 
          new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle(`You have added ${added.length} songs to the top of the queue | ${total}`)
            .addFields(editFields())
        ]})
        res.reactions.removeAll().catch(e => console.log(e))
      })
    }
  }