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
        // console.log({added})
        let i = 0
        let total = added.reduce((acc, cur) => {
            let song = added[i]
            i ++
            // console.log(song)
            return acc += song.duration
        })
        // let sum = obj.reduce(function (accumulator, curValue) {

        //     return accumulator + curValue.n
        
        // }, initialValue)
        const description = () => {
            let str = ''
            added.forEach((l, i) =>{ 
                song = added[i]
                console.log({song})
                const emoji = client.customEmojis[song.source]
                str += `${emoji} **${i + 1}** [${song.name}](${song.url}) ${song.formattedDuration}\n`
            })
            return str
        }

        const embed = new EmbedBuilder()
            .setColor(client.colors.primary)
            .setTitle(`You added ${added.length} songs | shrug emoji`)
            .setDescription(description())

        if(added[0].thumbnail) embed.setThumbnail(added[0].thumbnail)

        return embed
    }
}
