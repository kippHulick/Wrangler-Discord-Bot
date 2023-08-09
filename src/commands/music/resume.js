module.exports = {
    data: {
      "name": 'resume',
      "aliases": ['resume', 'unpause'],
      "inVoiceChannel": true,
      "command": "music",
    },
    
  execute: async (message, args) => {
    const queue = message.client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now idiot!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Resumed the song for you :)')
    } else {
      message.channel.send('The queue is not paused!')
    }
  }
}