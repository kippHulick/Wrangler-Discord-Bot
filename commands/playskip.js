module.exports = {
    data: {
        "name": 'playskip',
        "aliases": ['ps'],
        "inVoiceChannel": true,
    },
    
    execute: async (message, args) => {
      const string = args.join(' ')
      if (!string) return message.channel.send(`Please enter a song url or query to search.`)
      message.client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message,
        skip: true
      })
    }
  }