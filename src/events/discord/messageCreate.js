const { MembershipScreeningFieldType } = require("discord.js");
const state =  require('../../utils/state')
const prefixData = require('../../utils/state.json');
const woman = require('../../utils/womanCheck')

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const prefix = prefixData[message.guildId] || ';'

        if(state.timeOut && message.author.id === `137219201852112897`) return await message.delete().catch(e => console.log(e))

		if (message.author.bot) return

        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return

        if (message.mentions.has(message.client.user.id)) {
            message.channel.send("Calm down big guy! Otherwise you're going to timeout.");
        }

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(' ')
        const command = args.shift().toLowerCase()

        const cmd = message.client.commands.get(command) || message.client.commands.get(message.client.aliases.get(command))

        if(!cmd) return

        // Woman Check \\
        if(cmd.data.command == "music") {
            const womanDenied = await woman.check(message, cmd, args)
            if (womanDenied == true) {
                console.log('woman has been denied')
                return
            }
        }

        if(cmd.data.inVoiceChannel && !message.member.voice.channel){
            return message.channel.send(`You need to be in a voice channel big guy!`)
        }

        try {
            cmd.execute(message, args)
        } catch (error) {
            console.log(error)
            message.channel.send(`Error: ${error}`)
        }
	},
};