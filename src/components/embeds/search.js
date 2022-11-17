const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
    data: {
        name: 'search'
    },
    async execute(songs, client) {
        console.log(songs);
        const emojis = {
            'spotify': '<:spotify:1042861901849305138>',
            'soundcloud': '<:soundCloud:1042861828247658496>',
            'youtube': '<:youTube:1042861956845023353>'
        }

        const fields = () => {
            const fields = []
            for(i = 1; i <= 5; i ++){
                const song = songs[i - 1]
                if(!song) continue
                fields.push({
                    name: `${i}`,
                    value: song.source ?client.customEmojis[song.source] + ` [${song.name}](${song.url})` : `[${song.name}](${song.url})`,
                })
            }
            return fields
        }

        return new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle('Pick an option below!')
            .addFields(fields())
            .setThumbnail(`${songs[0].thumbnail}`)
    }
}