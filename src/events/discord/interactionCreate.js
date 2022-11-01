module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        const { client, message } = interaction

		if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!' }).catch(e => console.log(e))
        }

        } else if (interaction.isButton()){
            //ToDo need to add a button command handler here still
        } else if (interaction.isSelectMenu()){
            const { selectMenus } = client
            const { customId } = interaction
            const menu = selectMenus.get(customId)
            if (!menu) return new Error('There is no code for this select menu!')

            try {
                await menu.execute(interaction, client)
            } catch (error) {
                console.log(error);
            }
        }
	},
};