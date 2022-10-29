const state = require('../../commands/tools/state');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        const { client, message } = interaction
        // const guild = interaction.message.client.guilds.cache.get(interaction.guild_id)
        // const member = guild.members.cache.get(interaction.member.user.id);
        // const voiceChannel = member.voice.channel;

		if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

        } else if (interaction.isButton()){
            const { customId } = interaction
            const songObj = state.songs[customId - 1]

            client.distube.play(
                interaction.member.voice.channel, songObj, {
                    textChannel: message.channel,
                    member: message.member,
                    message
                    }
            )
            interaction.message.delete()

        } else if (interaction.isSelectMenu()){
            const { selectMenus } = client
            const { customId } = interaction
            const menu = selectMenus.get(customId)
            if (!menu) return new Error('There is no code for this select menu!')

            try {
                console.log('activation button');
                await menu.execute(interaction, client)
            } catch (error) {
                console.log(error);
            }
        }
	},
};