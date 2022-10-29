module.exports = {
	name: 'searchInvalidAnswer',
	execute(message) {
		message.channel.send('Invalid number of result.')
	},
};