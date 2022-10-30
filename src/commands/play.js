const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
    SelectMenuBuilder,
    SelectMenuOptionBuilder,
    ComponentType
} = require("discord.js")

module.exports = {
	data: {
        "name": 'play',
        "aliases": ['p'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
        const { client } = message
        console.log('Playing!')
        const string = args.join(' ')

        if(string.slice(0, 4) === 'http'){
            client.distube.play(
                message.member.voice.channel, string, {
                    textChannel: message.channel,
                    member: message.member,
                    message,
                }
            )
            message.delete()
            return
        }

        if(!string) return message.channel.send('You need a song to play dum dum!')

        const songs = await client.distube.search(string)

        const fields = () => {
            const fields = []
            for(i = 1; i <= 5; i ++){
                fields.push({
                    name: `${i}`,
                    value: `${songs[i - 1].name}`,
                })
            }
            return fields
        }

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Pick an option below!')
            .addFields(fields())

        try {
            const res = await message.reply({ embeds: [embed], ephemeral: true })//, components: [buttons1, buttons2]
            // const reply = await message.awaitMessageComponent(opt).then(i => console.log(i))
            res.react(`1️⃣`)
            res.react(`2️⃣`)
            res.react(`3️⃣`)
            res.react(`4️⃣`)
            res.react(`5️⃣`)
            
            const filter = (reaction, user) => {
                return user.id === message.member.id
            }

            const collector = res.createReactionCollector({ filter, time: 10000 })
            collector.on('collect', (reaction, user) => {
                const emoji = reaction.emoji.name

                switch (emoji) {
                    case '1️⃣':
                        client.distube.play(
                            message.member.voice.channel, songs[0], {
                                textChannel: message.channel,
                                member: message.member,
                                message
                                }
                        )
                        break

                    case '2️⃣':
                        client.distube.play(
                            message.member.voice.channel, songs[1], {
                                textChannel: message.channel,
                                member: message.member,
                                message
                                }
                        )
                        break

                    case '3️⃣':
                        client.distube.play(
                            message.member.voice.channel, songs[2], {
                                textChannel: message.channel,
                                member: message.member,
                                message
                                }
                        )
                        break

                    case '4️⃣':
                        client.distube.play(
                            message.member.voice.channel, songs[3], {
                                textChannel: message.channel,
                                member: message.member,
                                message
                                }
                        )
                        break

                    case '5️⃣':
                        client.distube.play(
                            message.member.voice.channel, songs[4], {
                                textChannel: message.channel,
                                member: message.member,
                                message
                                }
                        )
                        break
                }
            })

            collector.on('end', (p) => {
                res.delete()
            })

        } catch (error) {
            console.log(error);
        }

    }
};
