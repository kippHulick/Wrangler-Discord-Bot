const { 
	EmbedBuilder,
} = require("discord.js")
const { SoundCloudPlugin } = require("@distube/soundcloud")

module.exports = {
    data: {
        "name": 'play',
        "aliases": ['p'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
        message.channel.sendTyping()
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
            return
        }

        if(!string) return message.channel.send('You need a song to play dum dum!')

        const songs = await SoundCloudPlugin.search(string)
        const embed = await client.embeds.get('search').execute(songs, client)

        try {
            const res = await message.reply({ embeds: [embed] }).catch(e => console.log(e))//, components: [buttons1, buttons2]
            // const reply = await message.awaitMessageComponent(opt).then(i => console.log(i))
            res.react(`1️⃣`)
            res.react(`2️⃣`)
            res.react(`3️⃣`)
            res.react(`4️⃣`)
            res.react(`5️⃣`)
            
            const filter = (reaction, user) => {
                return user.id === message.member.id
            }

            const added = []

            const helper = (idx) => {
                client.distube.play(
                    message.member.voice.channel, songs[idx], {
                        textChannel: message.channel,
                        member: message.member,
                        message
                        }
                )
                added.push(songs[idx])
            }

            const collector = res.createReactionCollector({ filter, time: 10000 })
            collector.on('collect', (reaction, user) => {
                const emoji = reaction.emoji.name

                switch (emoji) {
                    case '1️⃣':
                        helper(0)
                        break

                    case '2️⃣':
                        helper(1)
                        break

                    case '3️⃣':
                        helper(2)
                        break

                    case '4️⃣':
                        helper(3)
                        break

                    case '5️⃣':
                        helper(4)
                        break
                }
            })

            collector.on('end', async (collected) => {
                if (added.length === 0) return res.delete().catch(e => console.log(e))
                await res.edit({ embeds: [ await client.embeds.get('searchFinish').execute(added, client) ]})
                res.reactions.removeAll().catch(e => console.log(e))
            })

        } catch (error) {
            console.log(error);
        }
    }
};
