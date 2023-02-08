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
        const emojis = {
            'spotify': '<:spotify:1042861901849305138>',
            'soundcloud': '<:soundCloud:1042861828247658496>',
            'youtube': '<:youTube:1042861956845023353>'
        }

        const fields = () => {
            let str = ''
            for(i = 1; i <= songs.length; i ++){
                const song = songs[i - 1]
                if(!song) continue
                str += song.source ? `${client.customEmojis[song.source]} **${i}** [${song.name}](${song.url}) \`${song.formattedDuration}\`\n` : `**${i}** [${song.name}](${song.url}) \`${song.formattedDuration}\`\n`
                // fields.push({
                //     name: `${i}`,
                //     value: song.source ? client.customEmojis[song.source] + ` [${song.name}](${song.url})` : `[${song.name}](${song.url})`,
                // })
            }
            str += `Type <1 2 3 4 5...>  to select a song (can select more than one)`
            return str
        }

        return new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle('Pick an option below!')
            .setDescription(fields())
            .setThumbnail(`${songs[0].thumbnail}`)
    }
}