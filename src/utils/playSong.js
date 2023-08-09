const woman = require('./womanCheck')

const playSong = {
    //type: [null, top, skip]
    async playSong (message, args, type) {
        message.channel.sendTyping()
        const { client } = message
        console.log('Playing!')
        const string = args.join(' ')
        time = message.client.searchTime

        // Woman Check \\
        // const womanDenied = await woman.check(message, string)
        // if (womanDenied == true) {
        //     console.log('woman has been denied')
        //     return
        // }

        if(string.slice(0, 4) === 'http') {
            let playObj = {
                textChannel: message.channel,
                member: message.member,
                message,
            }

            if(type === 'top') playObj.position = 1
            if(type === 'skip') playObj.skip = true

            client.distube.play(message.member.voice.channel, string, playObj)
            return
        }

        if(!string) return message.channel.send('You need a song to play dum dum!')

        const songs = await client.distube.search(string)
        const embed = await client.embeds.get('search').execute(songs, client)

        try {
            const res = await message.reply({ embeds: [embed] }).catch(e => console.log(e))
            for(let i = 1 ; i <= songs.length; i++){
                res.react(String(client.customEmojis[i]))
            }

            const added = []

            const helper = (idx) => {
                let playObj = {
                    textChannel: message.channel,
                    member: message.member,
                    message
                }

                if(type === 'top') playObj.position = added.length + 1
                if(type === 'skip') added.length > 0 ? playObj.position = added.length : playObj.skip = true                

                client.distube.play(message.member.voice.channel, songs[idx], playObj)
                added.push(songs[idx])
            }

            const messageFilter = (reply) => reply.author.id === message.member.id

            const messageCollector = res.channel.createMessageCollector({ messageFilter, time })

            const filter = (reaction, user) => {
                return user.id === message.member.id
            }

            const reactionCollector = res.createReactionCollector({ filter, time })
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
}

module.exports = playSong