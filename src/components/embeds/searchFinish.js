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
            added.forEach((l, i) =>{ 
                song = added[i]
                const emoji = client.customEmojis[song.source]
                str += `${emoji} **${i + 1}** [${song.name}](${song.url}) ${song.formattedDuration}\n`
            })
            return str
        }

        const embed = new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle(`You added ${added.length} song${added.length > 1 ? 's' : ''} | ${total}`)
            .setDescription(description())

        if(added[0].thumbnail) embed.setThumbnail(added[0].thumbnail)

        return embed
    }
}
