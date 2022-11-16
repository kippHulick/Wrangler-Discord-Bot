const { 
	EmbedBuilder,
    AttachmentBuilder
} = require("discord.js")

const phin = require('phin')
let fs = require('fs')
const path = require('node:path')

module.exports = {
    data: {
        "name": 'oogway',
        "aliases": ['oogs', 'oog', 'oogy'],
    },

    execute: async (message, args) => {
        const { client } = message
        if (args.length === 0) return message.channel.send(`What are you trying to say buddy?`)
        const quote = args.join(' ')
        const url = new URL('https://some-random-api.ml/canvas/misc/oogway2')
        url.searchParams.append('quote', quote)

        try {
            // const res = await fetch(url.href)
            // const data = await res.json()

            phin({url}).then(async res => {
                if (res.statusCode !== 200) {
                    console.log('Bad status code')
                    console.log(JSON.parse(res.body))
                }
                const imagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'oogway')
                fs.writeFile(`${imagePath}/${args.join('')}.png`, res.body, async (err) => {
                    if (err) return console.log('Something went wrong when writing the file' + err)
                    const file = new AttachmentBuilder(`${imagePath}/${args.join('')}.png`);
                    const embed = new EmbedBuilder()
                        .setColor(message.client.colors.primary)
                        .setTitle(`Oogway's Wisdom`)
                        .setImage(`attachment://${args.join('')}.png`)
                        .setTimestamp()

                    const reply = await message.channel.send({ embeds: [embed], files: [file] })
                })
            })
        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`I'm calling the police`)
        }
    }
}