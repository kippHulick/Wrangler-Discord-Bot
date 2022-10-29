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
        message.client.distube.play(
            message.member.voice.channel, args.join(' '), {
                textChannel: message.channel,
                member: message.member,
                message,
            }
        )
    }
};
