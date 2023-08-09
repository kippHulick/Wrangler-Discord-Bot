module.exports = {
    data: {
      "name": 'setup',
      "command": "music",
    },
  
    execute: async (message, args) => {
        const queue = message.client.distube.getQueue(message)



        guild.channels.create({ name: 'wrangle-zone', reason: `This is for viewing what's playing in the queue.` })
            .then(console.log)
            .catch(console.error)
    }
}