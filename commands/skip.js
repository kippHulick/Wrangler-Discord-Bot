module.exports = {
    data: {
        "name": 'skip',
        "aliases": ['s'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue.autoplay && Queue.songs.length <= 1) return
      if (!queue) return message.channel.send(`There is nothing in the queue buddy!`)
      try {
        const song = await queue.skip()
        message.channel.send(`Skipped! Now playing:\n${song.name}`)
      } catch (e) {
        message.channel.send(`Error: ${e}`)
      }
    }
  }