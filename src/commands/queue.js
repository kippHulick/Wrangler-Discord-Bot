module.exports = {
    data: {
        "name": 'queue',
        "aliases": ['q'],
    },

    execute: async (message, args) => {
      const queue = message.client.distube.getQueue(message)
      if (!queue) return message.channel.send(`There is nothing playing dum dum!`)
      let totalSongs = 1
      let totalDuration = 0
      const q = queue.songs
        .map((song, i) => {
            totalDuration += song.duration
            totalSongs += i
            return `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        })
        .join('\n')
        console.log(`**Server Queue**\n**${totalSongs} Total Songs**\n**\`${Math.floor(totalDuration / 60)}:${totalDuration % 60}\` Minutes of music**\n${q.slice(0, 1950)}`.length)
      message.channel.send(
        totalDuration > 3600 ?
        `**Server Queue**\nTotal Songs \`${totalSongs}\`\n**Hours of music: \`${Math.floor(totalDuration / 60 /60)}:${Math.floor(Math.floor(totalDuration / 60 /60) % 60)}:${totalDuration % 60}\`**\n${q.slice(0, 1920)}`
        :
        `**Server Queue**\nTotal Songs: \`${totalSongs}\`\n**Minutes of music: \`${Math.floor(totalDuration / 60)}:${totalDuration % 60}\`**\n${q.slice(0, 1920)}`
        )
    }
}