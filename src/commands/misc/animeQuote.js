const { 
	EmbedBuilder,
} = require("discord.js")

module.exports = {
    data: {
        "name": 'anime',
        "aliases": ['a', 'aq'],
    },

    execute: async (message, args) => {
        const url = new URL('https://some-random-api.ml/animu/quote')

        try {
            const res = await fetch(url.href)
            const data = await res.json()
            const embed = new EmbedBuilder()
                .setColor(message.client.colors.primary)
                .setTitle(data.sentence)
                .setAuthor({ name: data.character })
                .setDescription(data.anime)

            const reply = await message.channel.send({ embeds: [embed] })

        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`Couldn't find anime quote`)
        }
    }
}