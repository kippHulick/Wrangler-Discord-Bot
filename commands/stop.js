module.exports = {
    data: {
        "name": 'stop',
        "aliases": ['disconnect', 'leave'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing in the queue right now buddy!`)
      queue.stop()
      message.channel.send(`Stopped!`)
    }
}