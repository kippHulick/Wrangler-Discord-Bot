module.exports = {
    data: {
        name: 'status'
    },
    async execute(queue) {
        return [
            { name: '🇶 Queue', value: `\`${queue.songs.length}\` Song${queue.songs.length > 1 ? 's' : ''} | \`${queue.formattedDuration}\``, inline: true },
            { name: '🔊 Volume', value: `\`${queue.volume}\``, inline: true },
            { name: '🔁 Loop', value: queue.repeatMode ? queue.repeatMode === 2 ? '\`All Queue\`' : '\`This Song\`' : '\`Off\`', inline: true },
            { name: '🔄 Autoplay', value: queue.autoplay ? '\`On\`' : '\`Off\`', inline: true },
            { name: `Filters`, value: `\`${queue.filters.names.join('\`, \`') || 'None'}\``}
        ]
    }
}