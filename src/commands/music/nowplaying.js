module.exports = {
  data: {
    "name": 'nowplaying',
    "aliases": ['np'],
    "inVoiceChannel": true,
    "command": "music",
  },
    
  execute: async (message, args) => {
    const { client } = message
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now big guy!`)
    const song = queue.songs[0]
    const songEmbed = await client.embeds.get('song').execute(queue, song)
    
    message.reply({ embeds: [songEmbed] }).catch(e => console.log(e))
  }
}