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

        // Woman Permmisions Check \\

        if(message.member.roles.cache.has('1051027080202166362')) { // if woman:

            const woman_name = message.author.username

            // message.channel.send('youre banning' + args[0]);
            const womanRebuke = new EmbedBuilder()
                .setColor(message.client.colors.youtube)
                .setTitle('🚨🚨🚨 Woman Permission Alert 🚨🚨🚨')
                //.setAuthor({ name: bannedUser.username, iconURL: bannedUser.avatarURL() })
                .setDescription(`${woman_name} (Woman) Is Trying To Play A Song Without A Man's Permission! Make sure to ask a MAN first.\nMEN INSTRUCTIONS: confirm or deny ${woman_name}'s request.`)
                .addFields({ name: `${woman_name} is trying to play the song: `, value: string })
                .setFooter({ text: 'This feature was brought to you by Kipp and Trent! 𐐘⚔ඩ' })

            const sentMessage = await message.channel.send({ embeds: [womanRebuke] }).catch(e => console.log(e))

            // on the next message written in bot_commands:
                // if the message is written by any role besides woman:
                    // if the string starts with "deny":
                        // print "permission denied. reason: {deny string [4:]}"
                    // else:
                        // print "permission granted."
                // else:
                    // print "you can't confirm yourself"

            

            const womanFilter = (reply) => !reply.author.roles.cace.has('1051027080202166362')
            const confirmationCollector = message.channel.createMessageCollector({ womanFilter, time: 10000 })
            
            confirmationCollector.on('collect', m => {
                // Logic For Denying Or Confirming
                if(m.lowercase.startsWith('deny')) {
                    const str = message.content
                    const index = str.indexOf(" "); // chop string in half at the first whitespace
                    const firstHalf = str.slice(0, index);
                    const secondHalf = str.slice(index + 1);
                    console.log(`Permission Denied. Reason: ${secondhalf}`)
                }
                else {
                    console.log('Permission Granted! Your song will now play.')  
                }
                
                sentMessage.delete()
            })
        }

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

        const songs = await client.distube.search(string)
        const embed = await client.embeds.get('search').execute(songs, client)

        try {
            const res = await message.reply({ embeds: [embed] }).catch(e => console.log(e))//, components: [buttons1, buttons2]
            // const reply = await message.awaitMessageComponent(opt).then(i => console.log(i))
            for(let i = 1 ; i <= songs.length; i++){
                res.react(String(client.customEmojis[i]))
            }
            
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

            const messageFilter = (reply) => reply.author.id === message.member.id

            const messageCollector = res.channel.createMessageCollector({ messageFilter, time: 10000 })

            const reactionCollector = res.createReactionCollector({ filter, time: 10000 })
            reactionCollector.on('collect', (reaction, user) => {
                const emoji = reaction.emoji.name
                const emojiKey = Object.keys(client.customEmojis).find(key => client.customEmojis[key] === emoji)
                if (Number(emojiKey) >= 0) { helper(Number(emojiKey) - 1)}
            })

            messageCollector.on('collect', m => {
                const numCheck = m.content.replaceAll(' ', '')
                if(!(isNaN(Number(numCheck)))){
                    const songNums = m.content.split(' ')
                    
                    songNums.forEach((number, i) => {
                        let num = Number(number)
                        setTimeout(() => {
                            if (num) { num <= 10 && num >= 0 ? helper(num - 1) : message.channel.send('Pick a valid number next time buddy!') }  
                        }, i * 300)
                    })

                    messageCollector.stop()
                }
    
            })

            reactionCollector.on('end', async (collected) => {
                if (added.length === 0) return res.delete().catch(e => console.log(e))
                await res.edit({ embeds: [ await client.embeds.get('searchFinish').execute(added, client) ]})
                res.reactions.removeAll().catch(e => console.log(e))
            })

        } catch (error) {
            console.log(error);
        }
    }
};
