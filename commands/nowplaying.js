module.exports = {
    data: {
        name: 'nowplaying',
        aliases: ['np'],
        inVoiceChannel: true,
    },
    
    execute: async (message, args) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing in the queue right now big guy!`)
      const song = queue.songs[0]
      message.channel.send(`I'm playing **\`${song.name}\`**, by ${song.user}`)
    }
}