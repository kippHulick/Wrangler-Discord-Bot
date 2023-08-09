module.exports = {
  data: {
    "name": 'shuffle',
    "inVoiceChannel": true,
    "command": "music",
  },
  
  execute: async (message, args) => {
    const queue = message.client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now idiot!`)
    queue.shuffle()
    // message.channel.send('Shuffled songs in the queue')
  }
}