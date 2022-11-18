const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")
const format = require('../../utils/format')

module.exports = {
    data: {
        name: 'searchFinish'
    },
    async execute(added, client) {
        const total = format.time(added.reduce((acc, obj) => (acc + obj.duration), 0))
        const description = () => {
            let str = ''
            added.forEach((song, i) => str += `${client.customEmojis[song.source]} **${i + 1}** [${song.name}](${song.url}) ${song.formattedDuration}\n`)
            return str
        }

        const embed = new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle(`You added ${added.length} songs | ${total}`)
            .setDescription(description())

        if(added[0].thumbnail) embed.setThumbnail(added[0].thumbnail)

        return embed
    }
}