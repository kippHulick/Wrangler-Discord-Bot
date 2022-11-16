const { 
	EmbedBuilder,
} = require("discord.js")

module.exports = {
    data: {
        "name": 'lyrics',
        "aliases": ['l'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
        const { client } = message
        const queue = client.distube.getQueue(message)
        // if (!queue) return message.channel.send(`There is nothing in the queue right now big guy!`)
        const songTitle = queue?.songs[0].name || 'pemex shakewell'
        const url = new URL('https://some-random-api.ml/others/lyrics')
        url.searchParams.append('title', songTitle)
        console.log({url});

        try {
            const data = await fetch(url.href)
            // const lines = data.lyrics.replace(/\n/g, "--")
            console.log({data});
            console.log(data.body);
            // const embed = new EmbedBuilder()
            //     .setTitle()
            //     .setDescription()
            //     .setUrl(data.genius)
            //     .setThumbnail(data.thumbnail)

        } catch (error) {
            console.log({error});
        }
    }
}