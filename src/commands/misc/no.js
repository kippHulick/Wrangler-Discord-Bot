const { 
	EmbedBuilder,
    AttachmentBuilder
} = require("discord.js")

const phin = require('phin')
let fs = require('fs')
const path = require('node:path')

module.exports = {
    data: {
        "name": 'no',
        "aliases": ['n', 'bitches', 'nb'],
    },

    execute: async (message, args) => {
        const { client } = message
        if (args.length === 0) return message.channel.send(`What are you trying to say buddy?`)
        const quote = args.join(' ')
        const url = new URL('https://some-random-api.ml/canvas/misc/nobitches')
        url.searchParams.append('no', quote)

        try {
            phin({url}).then(async res => {
                if (res.statusCode !== 200) {
                    console.log('Bad status code')
                    console.log(JSON.parse(res.body))
                }
                const imagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'bitches')
                fs.writeFile(`${imagePath}/${args[0]}.png`, res.body, async (err) => {
                    if (err) return console.log('Something went wrong when writing the file' + err)
                    const file = new AttachmentBuilder(`${imagePath}/${args[0]}.png`);
                    const embed = new EmbedBuilder()
                        .setColor(message.client.colors.primary)
                        .setTitle(`no bitches?`)
                        .setImage(`attachment://${args[0]}.png`)
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