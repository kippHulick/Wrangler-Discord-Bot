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
        const fields = () => {
            const fields = []
            for(i = 1; i <= 5; i ++){
                fields.push({
                    name: `${i}`,
                    value: `${songs[i - 1].name}`,
                })
            }
            return fields
        }

        return new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle('Pick an option below!')
            .addFields(fields())
    }
}