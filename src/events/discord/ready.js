const { ActivityType } = require("discord.js");

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {

		const status = {
			type: ActivityType.Playing,
			text: "Trent's mom"
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
		await client.user.setPresence({
			activities: [{
				name: status.text,
				type: status.type,
			}],
			status: status.type
		})
	},
};