const state = require('../../services/state');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        // const guild = interaction.message.client.guilds.cache.get(interaction.guild_id)
        // const member = guild.members.cache.get(interaction.member.user.id);
        // const voiceChannel = member.voice.channel;

		if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

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

            interaction.message.client.distube.play(
                interaction.member.voice.channel, songObj, {
                    textChannel: interaction.message.channel,
                    member: interaction.message.member,
                    message: interaction.message,
                    }
            )
            interaction.message.delete()
        }
	},
};