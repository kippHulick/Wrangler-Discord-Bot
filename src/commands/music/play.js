const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'play',
    "aliases": ['p'],
    "inVoiceChannel": true,
    "command": "music",
  },
    
  execute: async (message, args) => {
    playSong(message, args, null)
  }
}