module.exports = {
	name: 'addList',
	execute(queue, playlist) {
        const status = queue.distube.client.embeds.get('status').execute
        console.log({queue});
		queue.textChannel?.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		)
	},
};