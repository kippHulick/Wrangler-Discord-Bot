const state = require('../../utils/state');
const phin = require('phin')
let fs = require('fs')
const path = require('node:path')

const { 
	EmbedBuilder,
    AttachmentBuilder
} = require("discord.js")

module.exports = {
	data: {
        "name": 'timeout',
        "aliases": ['to'],
    },

    execute: async (message, args) => {

        if(message.author.id === '137219201852112897'){
            await message.delete().catch(e => console.log(e))
            await message.channel.send(`Sorry buddy, you can't do that!`)
            return
        }

        state.toggleTimeOut()
        const avatar = await message.author.avatarURL()

        const url = new URL('https://some-random-api.ml/canvas/overlay/jail')
        url.searchParams.append('avatar', avatar)
        console.log({avatar, url});

        try {
            phin({url}).then(async res => {
                if (res.statusCode !== 200) {
                    console.log('Bad status code')
                    console.log(JSON.parse(res.body))
                }
                const imagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'jail')
                fs.writeFile(`${imagePath}/${message.author.username}.png`, res.body, async (err) => {
                    if (err) return console.log('Something went wrong when writing the file' + err)
                    const file = new AttachmentBuilder(`${imagePath}/${message.author.username}.png`);
                    const embed = new EmbedBuilder()
                        .setColor(message.client.colors.primary)
                        .setTitle(state.timeOut ? `Uh oh! Someone's been naughty it's timeout time!` : `Alright buddy, you behave yourself now ok.`)
                        .setImage(`attachment://${message.author.username}.png`)
                        .setTimestamp()

                    const reply = await message.channel.send({ embeds: [embed], files: [file] })
                })
            })
        } catch (error) {
            console.log({error});
            const reply = await message.channel.send(`I'm calling the police`)
        }
    }
};
