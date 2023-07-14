const woman = require('../../utils/womanCheck')

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
    time = message.client.searchTime

    // Woman Check \\
    const womanDenied = await woman.check(message, string)
    console.log({womanDenied})
    if (womanDenied == true) {
        console.log('woman has been denied')
        return
    }

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

    const embed = await client.embeds.get('search').execute(songs, client)

    const res = await message.reply({ embeds: [embed], ephemeral: true }).catch(e => console.log(e))
    console.log(client.customEmojis[1])
    for(let i = 1 ; i <= songs.length; i++){
      res.react(client.customEmojis[i])
    }
    
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

    const collector = res.createReactionCollector({ filter, time })
    collector.on('collect', (reaction, user) => {
      const emoji = reaction.emoji.name
      helper(Object.keys(client.customEmojis).find(key => client.customEmojis[key] === emoji))
    })

    collector.on('end', async (collected) => {
      if (added.length === 0) return res.delete().catch(e => console.log(e))
      await res.edit({ embeds: [ await client.embeds.get('searchFinish').execute(added, client) ]})
      res.reactions.removeAll().catch(e => console.log(e))
    })
  }
}