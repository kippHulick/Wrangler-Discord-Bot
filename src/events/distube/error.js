module.exports = {
	name: 'error',
	execute(textChannel, e) {
		console.error(e);
		textChannel.send(
			`An error encountered: ${e.message.slice(0, 1970)}`,
		)
	},
};