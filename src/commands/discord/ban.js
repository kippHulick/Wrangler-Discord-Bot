const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
	data: {
        "name": 'ban',
        "aliases": ['b'],
    },

    execute: async (message, args) => {
        if(args.length <= 0) return
        const banned = args[0]
        args.shift()
        if (banned.startsWith('<@') && banned.endsWith('>')) {
            const bannedUser = message.client.users.cache.get(banned.slice(2, -1))

            const reason = () => {
                if(args.length === 0) return `No reason given`
                else return args.join(' ')
            }

            // message.channel.send('youre banning' + args[0]);
            const embed = new EmbedBuilder()
                .setColor(message.client.colors.youtube)
                .setTitle('Uh oh! Someones been naughty!!')
                .setAuthor({ name: bannedUser.username, iconURL: bannedUser.avatarURL() })
                .setDescription(`${banned} Has Been Banned`)
                .addFields({ name: 'Reason for ban', value: reason() })

            const reply = await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        }

    }
};
