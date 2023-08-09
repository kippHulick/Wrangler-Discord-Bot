module.exports = {
  data: {
    "name": 'leave',
    "aliases": ['bye'],
    "command": "music",
  },

  execute: async (message, args) => {
    message.client.distube.voices.leave(message)
  }
}