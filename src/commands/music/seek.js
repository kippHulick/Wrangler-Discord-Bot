module.exports = {
    data: {
        name: "seek",
        inVoiceChannel: true,
        "command": "music",
    },
   
    execute: async (message, args) => {
        const queue = message.client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        if (!args[0]) {
        return message.channel.send(`Please provide position (in seconds) to seek!`)
        }
        const time = Number(args[0])
        if (isNaN(time)) return message.channel.send(`Please enter a valid number!`)
        queue.seek(time)
        message.channel.send(`Seeked to ${time}!`)
    }
}