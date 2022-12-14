const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
	name: 'addList',
	async execute(queue, playlist) {
        const icon = (source) => {
            switch (source){
                case 'spotify':
                    return 'https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png'

                case 'youtube':
                    return 'https://image.similarpng.com/very-thumbnail/2020/07/Youtube-logo-with--new-style-on-transparent-background-PNG.png'

                case 'soundcloud':
                    return 'https://w7.pngwing.com/pngs/183/887/png-transparent-soundcloud-logo-soundcloud-computer-icons-logo-soundcloud-logo-orange-desktop-wallpaper-music-download-thumbnail.png'

                case 'custom':
                    return 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png'

                default:
                    return ''
            }
        }
        playlistEmbed = new EmbedBuilder()
            .setTitle(`Added ${playlist.name} to the queue`)
            .setDescription(`${playlist.songs.length} Songs added`)
            .setColor(queue.client.colors[playlist.source] || queue.client.colors.primary)
            .setURL(playlist.url)
            .setAuthor({ name: playlist.source, iconURL: icon(playlist.source) })
            .setThumbnail(playlist.thumbnail)

		const message = await queue.textChannel.send({ embeds: [playlistEmbed] }).catch(e => console.log(e))
	},
};