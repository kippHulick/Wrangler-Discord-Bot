const { 
	EmbedBuilder,
} = require("discord.js")

module.exports = {
    data: {
        "name": 'lyrics',
        "aliases": ['l'],
    },

    execute: async (message, args) => {
        const { client } = message
        const queue = client.distube.getQueue(message)
        if (!queue && args.length === 0) return message.channel.send(`What song are you looking up buddy?`)
        const songTitle = args.join(' ') || queue?.songs[0].name
        const url = new URL('https://some-random-api.ml/others/lyrics')
        url.searchParams.append('title', songTitle)

        try {
            const res = await fetch(url.href)
            const data = await res.json()
            let lines = data.lyrics.replace(/--/g, "\n")
            const embed = new EmbedBuilder()
                .setColor(message.client.colors.primary)
                .setTitle(`${data.title} Lyrics`)
                .setURL(`${data.links.genius}`)
                .setThumbnail(`${data.thumbnail.genius}`)
                .setAuthor({ name: data.author })
                .setDescription(`${lines}`)
                .setTimestamp()

            const reply = await message.channel.send({ embeds: [embed] })

        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`Couldn't find the lyrics :|`)
        }
    }
}