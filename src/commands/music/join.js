const { Constants } = require('discord.js')

module.exports = {
  data: {
    name: 'join',
    aliases: ['move'],
    inVoiceChannel: true,
    "command": "music",
  },

  execute: async (message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await message.client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`$${args[0]} is not a valid voice channel!`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `You must be in a voice channel or enter a voice channel id!`
      )
    }
    message.client.distube.voices.join(voiceChannel)
  }
}