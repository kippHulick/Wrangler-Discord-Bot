module.exports = {
    data: {
        "name": 'youtube',
        "aliases": ['yt'],
        "inVoiceChannel": true,
    },

    execute: async (message, args) => {
        message.client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
        })

  }
}