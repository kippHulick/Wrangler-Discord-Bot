module.exports = {
    data: {
        "name": 'previous',
        "inVoiceChannel": true,
        "command": "music",
    },
    
    execute: async (message) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
      if(queue.previousSongs.length === 0) return message.channel.send(`There is nothing before this song!`)
      const song = queue.previous()
    }
  }