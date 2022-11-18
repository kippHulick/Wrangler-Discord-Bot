module.exports = {
  data: {
    "name": 'autoplay',
    "inVoiceChannel": true,
  },

  execute: async (message) => {
    const queue = message.client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now bud!`)
    const autoplay = queue.toggleAutoplay()
    // message.channel.send(`AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}