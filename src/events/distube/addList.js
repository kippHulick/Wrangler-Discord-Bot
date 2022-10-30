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
            }
        }
        playlistEmbed = new EmbedBuilder()
            .setTitle(`Added ${playlist.name} to the queue`)
            .setDescription(`${playlist.songs.length} Songs added`)
            .setURL(playlist.url)
            .setAuthor({ name: playlist.source, iconURL: icon() })
            .setThumbnail(playlist.thumbnail)

		const message = await queue.textChannel.send({ embeds: [playlistEmbed] })
	},
};

// const status = queue.distube.client.embeds.get('status').execute
//         console.log({queue});
// 		queue.textChannel?.send(
// 			`Added \`${playlist.name}\` playlist (${
// 				playlist.songs.length
// 			} songs) to queue\n${status(queue)}`,
// 		)