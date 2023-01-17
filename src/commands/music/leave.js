module.exports = {
  data: {
    "name": 'leave',
    "aliases": ['bye']
  },

  execute: async (message, args) => {
    message.client.distube.voices.leave(message)
  }
}