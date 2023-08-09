const { 
	EmbedBuilder,
} = require("discord.js")

const woman = {
    async check (message, cmd, args) {
        let denyWoman = Boolean

        const woman_id = '1051027080202166362' // cool kid club woman: ('1051027080202166362'), devServerWoman: '1129157750279110817'
        

        if(!message.member._roles.includes(woman_id)) { // statement is true if no woman role
            denyWoman = false
            return
        }

        const woman_name = `<@${message.author.id}>`
        const womanRebuke = new EmbedBuilder()
            .setColor(message.client.colors.youtube)
            .setTitle('🚨🚨🚨 Woman Permission Alert 🚨🚨🚨')
            //.setAuthor({ name: bannedUser.username, iconURL: bannedUser.avatarURL() })
            .setDescription(`${woman_name} (Woman) Is Trying To Use The Bot Without A Man's Permission! Make sure to ask a MAN first.\n\nMEN INSTRUCTIONS: confirm or deny ${woman_name}'s request.`)
            .addFields({ name: `Command Used:`, value: `\`${cmd.data.name}\` ${args}` })
            .setFooter({ text: 'This feature was brought to you by Kipp and Trent! 𐐘⚔ඩ' })

        const sentMessage = await message.channel.send({ embeds: [womanRebuke] }).catch(e => console.log(e))
        const womanFilter = m => !m.member._roles.includes(woman_id)        

        // wait until next message is posted in bot_commands \\
        const messageCollector = await message.channel.awaitMessages({
            filter: womanFilter,
            max: 1,
            time: message.client.searchTime,
        }).catch((e) => console.log(e))

        .then(collected => {
            if(collected.size === 0) {
                denyWoman = true
                sentMessage.delete().catch(e => console.log(e))
                message.channel.send(`Sorry! The men must be doing some very important man things and can't be bothered right now. Try again later!`)
                return
            }

            //console.log(typeof m) // === object. THANK YOU! THANK YOU SO MUCH JAVASCRIPT

            const confirmation = collected.first()

            // Logic For Denying Or Confirming
            let confirm_deny = confirmation.content.toLowerCase()
            if(confirm_deny.startsWith('deny')) {

                confirmation.channel.send(`You have been denied :( Unlucky! Maybe send some feet pics in general and try again!`)
                denyWoman = true
            }
            else {
                confirmation.channel.send('Permission Granted! Your song will now play.')
                denyWoman = false
            }
            sentMessage.delete().catch(e => console.log(e))
        }).catch((e) => {console.log(e)})
        return denyWoman
    }
}
module.exports = woman