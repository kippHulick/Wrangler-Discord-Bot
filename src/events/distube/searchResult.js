const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
	name: 'searchResult',
	async execute(message, result) {
		const fields = result.map((song, i) => {
			return { name: `${i + 1}`, value: `${song}` }
		})


		const buttons = () => {
			const buttons = []
			for( let i = 1; i <=5; i++){
				buttons.push( new ButtonBuilder()
					.setCustomId('primary')
					.setLabel(`${i}`)
					.setStyle(ButtonStyle.Primary)
				)
			}
			return buttons
		}

		const buttonsRow = new ActionRowBuilder()
			.addComponents(new ButtonBuilder()
			.setCustomId('primary')
			.setLabel(`1`)
			.setStyle(ButtonStyle.Primary))

		const searchResult = new EmbedBuilder()
			.setColor(0x3498db)
			.setTitle('Choose an option below!')
			.addFields(result.map((song, i) => {
				return { name: `${i + 1}`, value: `${song}` }
			}))

			await message.channel.send({ embeds: [searchResult], components: [buttonsRow] })
		// let i = 0;
		// message.channel.send(
		// 	`**Choose an option from below**\n${result
		// 		.map(
		// 			song =>
		// 				`**${++i}**. ${song.name} - \`${
		// 					song.formattedDuration
		// 				}\``,
		// 		)
		// 		.join(
		// 			'\n',
		// 		)}\n*Enter anything else or wait 30 seconds to cancel*`,
		// );
	},
};