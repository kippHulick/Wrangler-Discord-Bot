const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
    data: {
        name: 'pages'
    },
    async execute(client, queue) {
        const pageLength = 10
        const { songs } = queue
        const pageArr = []
        let songArr = []
        let songNum = []
        let pageNum = 1
        for(const i of songs.keys()){
            let song = songs[i]
            if( (i + 1) % pageLength === 0 || i === songs.length ){
            const songField = () => {
                songString = `**Playing:** [${songs[0].name}](${songs[0].url})\nDuration: \`${songs[0].formattedDuration}\` - Requested by <@${song.user.id}>\n**Next Songs:**\n`
                songArr.forEach((songObj, j) => songString = `${songString}**${songNum[j]}.** [${songObj.name}](${songObj.url}) - \`${songObj.formattedDuration}\`\n`)
                return songString
            }

            songArr.push(song)
            songNum.push(i + 1)
            pageArr.push(
                new EmbedBuilder()
                .setColor(client.colors.primary)
                .setTitle('🎶 Server Queue 🎶')
                .setDescription(songField())
                .setFooter({ text: `Page ${pageNum}/${Math.floor(songs.length / pageLength)} • ${songs.length} Songs • Duration: ${queue.formattedDuration}` })
            )
            ++pageNum
            songArr = []
            songNum = []
            } else {
            songArr.push(song)
            songNum.push(i + 1)
            }
        }
        return pageArr
    }

}