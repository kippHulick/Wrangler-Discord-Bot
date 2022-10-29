module.exports = {
	name: 'addList',
	execute(queue, playlist) {
		queue.textChannel?.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
            //! Status
		)
	},
};