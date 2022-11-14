module.exports = {
    data: {
        name: 'filter',
        aliases: ['filters', 'f'],
        inVoiceChannel: true,
    },

    execute: async (message, args) => {
        const defFilters = ['earwax', 'tremolo', 'phaser', 'mcompand', 'surround', 'reverse', 'haas', 'gate', 'flanger', 'vaporwave', 'nightcore', 'karaoke', 'echo', 'bassboost', '3d']
        const { client } = message
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        const filter = args[0]
        if (filter === 'off' && queue.filters.size) queue.filters.clear()
        else if (Object.keys(client.distube.filters).includes(filter)) {
        if (queue.filters.has(filter)) queue.filters.remove(filter)
        else queue.filters.add(filter)
        } else if (args[0]) return message.channel.send(`Not a valid filter`)
        message.channel.send(`Current Queue Filter: \`${queue.filters.names.join('\`, \`') || 'Off'}\`\nAll filters: \`${defFilters.join('\`, \`')}\``)
    }
}