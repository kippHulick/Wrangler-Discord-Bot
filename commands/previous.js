module.exports = {
    data: {
        name: 'previous',
    inVoiceChannel: true,
    },
    
    execute: async (message) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
      const song = queue.previous()
      message.channel.send(`Now playing:\n${song.data.name}`)
    }
  }