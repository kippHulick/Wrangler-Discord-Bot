module.exports = {
	name: 'empty',
	execute(queue) {
		queue.textChannel?.send(
			'The voice channel is empty! Leaving the voice channel...',
		)
	},
};