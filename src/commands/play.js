const state = require('../../services/state')

const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
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
        if(!string) return message.channel.send('You need a song to play dum dum!')

        const songs = await message.client.distube.search(string)
        state.songs = songs
        console.log(state.songs);
        // console.log(songs)

        const fields = () => {
            return songs.map((song, i) => (
                {
                    name: `${song.name}`,
                    value: `${i +1}`
                }
            ))
        }

        // console.log(fields());

        const button = () => {
            let buttons = []
            for(let i = 1; i <= 5; i++){
                const button = new ButtonBuilder()
                    .setCustomId(`play${i}`)
                    .setLabel(`${i}`)
                    .setStyle(ButtonStyle.Primary)

                buttons.push(button)
            }

            return buttons
        }

        const buttons = new ActionRowBuilder().addComponents(button())

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Pick an option below!')
            .addFields(fields())

        const res = await message.reply({embeds: [embed], components: [buttons]})

        console.log(res);

        // message.client.distube.play(
        //     message.member.voice.channel, args.join(' '), {
        //         textChannel: message.channel,
        //         member: message.member,
        //         message,
        //     }
        // )
    }
};
