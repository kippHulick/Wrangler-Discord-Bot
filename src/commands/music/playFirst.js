const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'playfirst',
    "aliases": ['p1', 'pf'],
    "inVoiceChannel": true,
    "command": "music",
  },
    
  execute: async (message, args) => {
    const { client, channel, member } = message
    
    const string = args.join(' ')
    const songs = await client.distube.search(string)
    let playObj = {
      textChannel: channel,
      member: member,
      message,
    }
    client.distube.play(member.voice.channel, songs[0], playObj)
    await message.reply({ embeds: [ await client.embeds.get('searchFinish').execute([songs[0]], client) ]})
  }
}