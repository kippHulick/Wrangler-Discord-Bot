module.exports = {
	name: 'finish',
	execute(queue) {
		queue.textChannel?.send('Finish queue!')
	},
};