const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'playskip',
    "aliases": ['ps'],
    "inVoiceChannel": true,
  },
  
  execute: async (message, args) => {
    playSong(message, args, 'skip')
  }
}