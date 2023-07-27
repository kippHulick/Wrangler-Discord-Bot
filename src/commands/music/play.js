const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'play',
    "aliases": ['p'],
    "inVoiceChannel": true,
  },
    
  execute: async (message, args) => {
    playSong(message, args, null)
  }
}