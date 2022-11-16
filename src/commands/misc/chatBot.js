const { 
	EmbedBuilder,
} = require("discord.js")
require('dotenv').config()

module.exports = {
    data: {
        "name": 'chatbot',
        "aliases": ['cb'],
    },

    execute: async (message, args) => {
        const { client } = message
        if (args.length === 0) return message.channel.send(`What are you trying to say buddy?`)
        const text = args.join(' ')
        const url = new URL('https://some-random-api.ml/chatbot')
        url.searchParams.append('message', text)
        url.searchParams.append('key', process.env.SRA_KEY)

        try {
            const res = await fetch(url.href)
            const data = await res.json()

            const embed = new EmbedBuilder()
                .setColor(message.client.colors.primary)
                .setTitle(`Wrangler Says`)
                .setDescription(`${data.response}`)
                .setTimestamp()

            const reply = await message.channel.send({ embeds: [embed] })

        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`I'm calling the police`)
        }
    }
}