const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

const db = require('../../utils/db')

module.exports = {
    data: {
        name: 'song'
    },
    async execute(queue, song) {
        const { client } = queue.distube
        let songPlays = await db.songPlays(song)
        const status = await client.embeds.get('status').execute(queue)
        const embed = new EmbedBuilder()
        .setColor(client.colors.primary)
        .setTitle(`🎶 Playing 🎶`)
        .setDescription(song.playlist ? ` **Playlist**: ${client.customEmojis[song.playlist.source]} [${song.playlist.name}](${song.playlist.url})\n**Current Song**: ${client.customEmojis[song.source]} [${song.name}](${song.url})` : `**Current Song**: ${client.customEmojis[song.source]} [${song.name}](${song.url})`)
        // .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .addFields([
            { name: 'Requested by', value: `<@${song.user.id}>`, inline: true },
            { name: '🕗 Duration', value: `\`${queue.formattedCurrentTime === '00:00' ? '' : `${queue.formattedCurrentTime}/`}${song.formattedDuration}\``, inline: true },
            ...status,
            { name: '👀 Views', value: `\`${song.views}\``, inline: true },
            { name: 'Server Plays', value: `\`${songPlays}\``, inline: true },
            { name: 'Bitrate', value: `\`${queue.voiceChannel.bitrate || '64000'}\``, inline: true },
        ])
        .setFooter({ text: 'This bot was coded by Kipp in Scratch™️', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png' })

        if(song.thumbnail) embed.setThumbnail(song.thumbnail)

        return embed

    }
}