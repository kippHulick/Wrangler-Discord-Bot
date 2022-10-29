module.exports = {
	name: 'searchNoResult',
	execute(message) {
		message.channel.send(`Sorry ${message.member} there was no result for your search`)
	},
};