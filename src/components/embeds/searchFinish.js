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
        const total = added.reduce((acc, obj) => (acc + Number(obj.duration)), 0)
        fields = () => added.map((song, i) => ({ name: `${i + 1} - ${song.formattedDuration}`, value: `[${song.name}](${song.url})` }))

        return new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle(`You added ${added.length} songs | ${format.time(total)}`)
            .addFields(fields())
            .setThumbnail(`${added[0].thumbnail}`)
    }
}