const { 
	EmbedBuilder,
} = require("discord.js")
require('dotenv').config()

module.exports = {
    data: {
        "name": 'image',
        "aliases": ['i'],
    },

    execute: async (message, args) => {
        if (args.length === 0) return message.channel.send(`What are you trying to say buddy?`)
        const image = args.join(' ')
        const url = new URL('https://serpapi.com/search')
        url.searchParams.append('tbm', 'isch')
        url.searchParams.append('q', image)
        url.searchParams.append('api_key', process.env.SERP_KEY)

        try {
            const res = await fetch(url.href, {headers: {key: process.env.SERP_KEY } })

            const data = await res.json()
            const image = data.images_results[0]

            const reply = await message.channel.send(image.original)

        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`Couldn't find an image`)
        }
    }
}