module.exports = {
  data: {
    "name": 'pause',
    "aliases": ['hold', 'resume'],
    "inVoiceChannel": true,
    "command": "music",
  },

  execute: async (message, args) => {
    const queue = message.client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now fatty!`)
    if (queue.paused) {
      queue.resume()
      return
      // return message.channel.send('Resumed the song for you :)')
    }
    queue.pause()
    message.channel.send('Paused the song for you :)')
  }
}