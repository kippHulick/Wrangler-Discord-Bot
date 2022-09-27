const { MembershipScreeningFieldType } = require("discord.js");

module.exports = {
	name: 'messageCreate',
	execute(message) {
        const prefix = ';'
		if (message.author.bot) return

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(' ')
        const command = args.shift().toLowerCase()

        const cmd = message.client.commands.get(command) || message.client.commands.get(message.client.aliases.get(command))

        if(!cmd) return

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