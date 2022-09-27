module.exports = {
    data: {
        name: 'leave',
        aliases: ['bye']
    },

    execute: async (message, args) => {
      client.distube.voices.leave(message)
    }
  }