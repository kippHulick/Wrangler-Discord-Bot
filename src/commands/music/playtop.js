const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'playtop',
    "aliases": ['pt'],
    "inVoiceChannel": true,
  },
    
  execute: async (message, args) => {
    playSong(message, args, 'top')
  }
}