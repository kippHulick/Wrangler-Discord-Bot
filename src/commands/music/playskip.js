const { playSong } = require('../../utils/playSong')

module.exports = {
  data: {
    "name": 'playskip',
    "aliases": ['ps'],
    "inVoiceChannel": true,
    "command": "music",
  },
  
  execute: async (message, args) => {
    playSong(message, args, 'skip')
  }
}