const state = require('../../utils/state')

module.exports = {
    data: {
        "name": 'prefix',
        "aliases": [],
    },

  execute: async (message, args) => {
    state.setPrefix(message.guildId, args[0])
    message.channel.send(`Prefix changed to ${args[0]}`)

  }
}