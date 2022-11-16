const { 
	EmbedBuilder,
} = require("discord.js")

module.exports = {
    data: {
        "name": 'pikachu',
        "aliases": ['pika', 'pika'],
    },

    execute: async (message, args) => {
        const url = new URL('https://some-random-api.ml/img/pikachu')

        try {
            const res = await fetch(url.href)
            const data = await res.json()
            const reply = await message.channel.send(data.link)

        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`Couldn't find anime quote`)
        }
    }
}