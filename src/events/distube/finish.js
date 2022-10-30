module.exports = {
	name: 'finish',
	execute(queue) {
		queue.textChannel?.send('No more songs in the queue!')
	},
};