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
        const songEmbed = await client.embeds.get('song').execute(queue, song)

		const message = await queue.textChannel.send({ embeds: [songEmbed] })

        message.react('🔉')
        message.react('🔊')
        // message.react('⏮')
        message.react('⏹')
        message.react('⏭')
        message.react('🔀')
        // message.react('🔁')
        message.react('🔄')
        message.react('⏸')

        const filter = (reaction, user) => {
            return !(user.id === '1023049554884575262')
        }

        const collector = message.createReactionCollector({ filter, time: Number(song.duration) * 1000 })

        collector.on('collect', async (reaction, user) => {
            const emoji = reaction.emoji.name
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
            console.log(`Collected reaction ${reaction.emoji.name}`);
            switch (emoji) {
                case '⏮':
                    client.commands.get('previous').execute(message)
                    break

                case '⏸':
                    message.reactions.cache.get('⏸').remove()
                    message.react('▶️')
                    client.commands.get('pause').execute(message)
                    break

                case '▶️':
                    message.reactions.cache.get('▶️').remove()
                    message.react('⏸')
                    client.commands.get('pause').execute(message)
                    break

                case '⏹':
                    client.commands.get('stop').execute(message)
                    break

                case '⏭':
                    client.commands.get('skip').execute(message)
                    break

                case '🔉':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                        volDown = queue.volume >= 10 ? queue.volume - 10 : 0
                        client.commands.get('volume').execute(message, [String(volDown)])
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔊':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                        volUp = queue.volume <= 90 ? queue.volume + 10 : 100
                        client.commands.get('volume').execute(message, [String(volUp)])
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔀':
                    client.commands.get('shuffle').execute(message)
                    break

                case '🔁':
                    client.commands.get('repeat').execute(message)
                    break

                case '🔄':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                        client.commands.get('autoplay').execute(message)
                    } catch (error) {
                        console.log(error);
                    }
                    break
            }
        })
	},
};