module.exports = {
    data: {
        "name": 'skip',
        "aliases": ['s'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {

      const queue = message.client.distube.getQueue(message)

      if (!(queue || queue?.songs)) return message.channel.send(`There is nothing in the queue buddy!`)

      if (queue.songs.length == 1) return queue.stop()

      try {
        const song = await queue.skip()
        message.channel.send(`Skipped!`)
      } catch (e) {
        message.channel.send(`Error: ${e}`)
      }
    }
  }