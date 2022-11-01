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
        .setTitle(`🎶 Playing 🎶`)
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(`${song.thumbnail}`)
        // .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .addFields([
            { name: 'Requested by', value: `<@${song.user.id}>`, inline: true },
            { name: '🕗 Duration', value: `\`${queue.formattedCurrentTime}/${song.formattedDuration}\``, inline: true },
            ...status,
            { name: '👀 Views', value: `\`${song.views}\``, inline: true },
            { name: 'Bitrate', value: `\`${queue.voiceChannel.bitrate}\``, inline: true },
        ])
        .setFooter({ text: 'This bot was coded by Kipp in Scratch™️', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png' })

    }
}