const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
	name: 'playSong',
	execute(queue, song) {
		const playSongEmbed = new EmbedBuilder()
			.setColor(0x3498db)
			.setTitle(`${song.name}`)
			// .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.addFields(status(queue))
			.setFooter({ text: `Added by ${song.user.username}` })
            //! Status

			// queue.textChannel?.send(
			// 	`Playing \`${song.name}\` - \`${
			// 		song.formattedDuration
			// 	}\`\nRequested by: ${song.user.username}\n${status(queue)}`,

		queue.textChannel.send({ embeds: [playSongEmbed] })
	},
};