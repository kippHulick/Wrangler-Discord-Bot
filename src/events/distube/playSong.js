const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

const db = require('../../utils/db')

module.exports = {
	name: 'playSong',
	async execute(queue, song) {
        const { client } = queue.distube
        await db.setDefaults(queue, song)
        const songEmbed = await client.embeds.get('song').execute(queue, song)
		const message = await queue.textChannel.send({ embeds: [songEmbed] })

        try {
            message.react('🇶')
            message.react('🔉')
            message.react('🔊')
            message.react('🔀')
            message.react('🔁')
            message.react('🔄')
            if (queue.previousSongs.length > 0) message.react('⏮')
            message.react('⏹')
            message.react('⏭')
            message.react('⏸')
        } catch (error) {
            console.log(error);
        }

        const filter = (reaction, user) => !(user.id === '1023049554884575262')

        const collector = message.createReactionCollector({ filter, time: Number(song.duration) * 1000 })

        collector.on('collect', async (reaction, user) => {
            const emoji = reaction.emoji.name
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
            switch (emoji) {
                case '⏮':
                    client.commands.get('previous').execute(message)
                    collector.stop()
                    break

                case '⏸':
                    message.reactions.cache.get('⏸').remove().catch(e => console.log(e))
                    message.react('▶️')
                    client.commands.get('pause').execute(message)
                    message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    break

                case '▶️':
                    message.reactions.cache.get('▶️').remove().catch(e => console.log(e))
                    message.react('⏸')
                    client.commands.get('pause').execute(message)
                    message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    break

                case '⏹':
                    client.commands.get('stop').execute(message)
                    collector.stop()
                    break

                case '⏭':
                    client.commands.get('skip').execute(message)
                    collector.stop()
                    break

                case '🔉':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        volDown = queue.volume >= 10 ? queue.volume - 10 : 0
                        client.commands.get('volume').execute(message, [String(volDown)])
                        message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔊':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        volUp = queue.volume <= 90 ? queue.volume + 10 : 100
                        client.commands.get('volume').execute(message, [String(volUp)])
                        message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔀':
                    client.commands.get('shuffle').execute(message)
                    message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    break

                case '🔁':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        switch(queue.repeatMode){
                            case 0:
                                arg = 'song'
                                break
                            case 1:
                                arg = 'queue'
                                break
                            case 2:
                                arg = 'off'
                                break
                        }
                        client.commands.get('repeat').execute(message, [arg])
                        message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    } catch (error) {
                        console.log(error);
                    }
                    
                    break

                case '🔄':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        
                        client.commands.get('autoplay').execute(message)
                        message.edit({ embeds: [await client.embeds.get('song').execute(queue, song)] })
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🇶':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id)
                        }
                        message.member = user
                        message.user = user
                        client.commands.get('queue').execute(message)
                    } catch (error) {
                        console.log(error)
                    }
                    break
            }
        })

        collector.on('end', (col) => {
            const finalEmbed = new EmbedBuilder()
                .setColor(client.colors.primary)
                .setTitle(`| Finished Playing |`)
                .setDescription(`[${song.name}](${song.url})`)
                .setThumbnail(`${song.thumbnail}`)
            message.reactions.removeAll().catch(e => console.log(e))
            message.edit({ embeds: [finalEmbed] })
        })
	},
};