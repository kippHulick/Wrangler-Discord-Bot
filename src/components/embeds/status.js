module.exports = {
    data: {
        name: 'status'
    },
    async execute(queue) {
        return [
            { name: 'Volume', value: `${queue.volume}` },
            { name: 'Loop', value: queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off', inline: true },
            { name: 'Autoplay', value: queue.autoplay ? 'On' : 'Off', inline: true },
            // { name: 'Inline field title', value: 'Some value here', inline: true },
        ]
    }
}