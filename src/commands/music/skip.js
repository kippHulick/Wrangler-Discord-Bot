module.exports = {
  data: {
    "name": 'skip',
    "aliases": ['s'],
    "inVoiceChannel": true,
    "command": "music",
  },

  execute: async (message, args) => {

    const queue = message.client.distube.getQueue(message)

    if (!(queue || queue?.songs) || (!queue.autoplay && queue.songs.length < 1)) return message.channel.send(`There is nothing in the queue !`)

    if (!queue.autoplay && queue.songs.length == 1) return queue.stop()

    try {
      const song = await queue.skip()
      // message.channel.send(`Skipped!`)
    } catch (e) {
      message.channel.send(`Error: ${e}`)
    }
  }
}