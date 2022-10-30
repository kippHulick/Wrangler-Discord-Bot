const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
	name: 'playSong',
	async execute(queue, song) {
        const { client } = queue.distube
        const status = client.embeds.get('status').execute
		const playSongEmbed = new EmbedBuilder()
			.setColor(0x3498db)
			.setTitle(`${song.name}`)
            .setThumbnail(`${song.thumbnail}`)
			// .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.addFields(await status(queue))
			.setFooter({ text: `Added by ${song.user.username}` })


			// queue.textChannel?.send(
			// 	`Playing \`${song.name}\` - \`${
			// 		song.formattedDuration
			// 	}\`\nRequested by: ${song.user.username}\n${status(queue)}`,

		const message = await queue.textChannel.send({ embeds: [playSongEmbed] })

        message.react('⏮')
        message.react('⏯')
        message.react('⏹')
        message.react('⏭')
        message.react('🔈')
        message.react('🔊')
        message.react('🔀')

        const filter = (reaction, user) => {
            return !(user.id === song.user.id)
        }

        const collector = message.createReactionCollector({ filter, time: Number(song.duration) * 1000 })

        collector.on('collect', (reaction, user) => {
            const emoji = reaction.emoji.name
            console.log(`Collected reaction ${reaction.emoji.name}`);
            switch (emoji) {
                case '⏮':
                    let previous = client.commands.get('previous')
                    previous.execute(message)
                    break

                case '⏯':
                    const pause = client.commands.get('pause')
                    pause.execute(message)
                    break

                case '⏹':
                    const stop = client.commands.get('stop')
                    stop.execute(message)
                    break

                case '⏭':
                    const skip = client.commands.get('skip')
                    skip.execute(message)
                    break

                case '🔈':
                    volDown = queue.volume >= 10 ? queue.volume - 10 : 0
                    const volumeDown = client.commands.get('volume')
                    volumeDown.execute(message, [String(volDown)])
                    message.edit({ embeds: [playSongEmbed] })
                    break

                case '🔊':
                    volUp = queue.volume <= 90 ? queue.volume + 10 : 100
                    console.log(queue.volume);
                    const volumeUp = client.commands.get('volume')
                    volumeUp.execute(message, [String(volUp)])
                    break

                case '🔀':
                    const shuffle = client.commands.get('shuffle')
                    shuffle.execute(message)
                    break
            }
        })
	},
};