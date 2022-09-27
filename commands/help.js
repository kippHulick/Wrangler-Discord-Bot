module.exports = {
    data: {
        name: 'help',
        aliases: ['h', 'cmd', 'command'],
    },

  execute: async (message, args) => {
    message.channel.send(message.client.commands.map(cmd => `\`${cmd.data.name}\``).join(', '))
  }
}