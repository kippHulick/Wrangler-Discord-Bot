const state = require('./tools/state')

const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
    SelectMenuBuilder,
    SelectMenuOptionBuilder,
} = require("discord.js")

module.exports = {
	data: {
        "name": 'play',
        "aliases": ['p'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
        console.log('Playing!')
        const string = args.join(' ')

        // console.log(string.slice(0, 4));

        if(string.slice(0, 4) === 'http'){
            message.client.distube.play(
                message.member.voice.channel, string, {
                    textChannel: message.channel,
                    member: message.member,
                    message,
                }
            )
            message.delete()
            return
        }

        if(!string) return message.channel.send('You need a song to play dum dum!')

        const songs = await message.client.distube.search(string)
        state.songs = songs

        const fields = () => {
            const fields = []
            for(i = 1; i <= 5; i ++){
                fields.push({
                    name: `${i}`,
                    value: `${songs[i - 1].name}`,
                })
            }
            return fields
        }

        // console.log(fields());

        const button = () => {
            let buttons = []
            for(let i = 1; i <= 5; i++){
                const button = new ButtonBuilder()
                    .setCustomId(`${i}`)
                    .setLabel(`${i}`)
                    .setStyle(ButtonStyle.Primary)

                buttons.push(button)
            }
            return buttons
        }

        const options = () => {
            const options = []
            for(let i = 0; i < 5; i++){
                const menuOption = new SelectMenuOptionBuilder({
                    label: `${songs[i].name}`,
                    value: `${i + 1}`
                })
                options.push(menuOption)
            }
            return options
        }

        const menu = new ActionRowBuilder()
            .addComponents(new SelectMenuBuilder()
                .setCustomId('searchmenu')
                .setMinValues(1)
                .setMaxValues(5)
                .setOptions(options()))

        const buttons = new ActionRowBuilder().addComponents(button())


        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Pick an option below!')
            .addFields(fields())

        const res = await message.reply({embeds: [embed], ephemeral: true, components: [buttons]})
    }
};
