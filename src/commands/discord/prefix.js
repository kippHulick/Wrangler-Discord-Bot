const state = require('../../utils/state')

module.exports = {
    data: {
        "name": 'prefix',
        "aliases": [],
    },

  execute: async (message, args) => {
    if (args.length <= 0) return message.channel.send('You need to choose a prefix big guy!')
    state.setPrefix(message.guildId, args[0])
    message.channel.send(`Prefix changed to ${args[0]}`)

  }
}