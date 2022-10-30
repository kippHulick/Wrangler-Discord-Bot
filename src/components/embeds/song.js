const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
    data: {
        name: 'song'
    },
    async execute(queue, song) {
        const { client } = queue.distube
        const status = await client.embeds.get('status').execute(queue)
        return new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle(`${song.name}`)
        .setDescription(`Added by ${song.user.username}`)
        .setThumbnail(`${song.thumbnail}`)
        // .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .addFields([
            ...status,
            { name: '🕗 Duration', value: `${song.formattedDuration}`, inline: true },
            { name: '👀 Views', value: `${song.views}`, inline: true },
        ])
        .setFooter({ text: 'This bot was coded by Kipp in Scratch™️', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png' })

    }
}