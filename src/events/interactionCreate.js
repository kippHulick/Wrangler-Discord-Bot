module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
    //     const guild = interaction.message.client.guilds.cache.get(interaction.guild_id)
        // const member = interaction.guild.members.cache.get(interaction.member.user.id);
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
            // // console.log(interaction.message.embeds[0].data.fields);

            // const songObj = interaction.message.embeds[0].data.fields.filter(obj => obj.value == interaction.type)
            // console.log(songObj);
            // interaction.message.client.distube.play(
            //     voiceChannel, songObj, {
            //         textChannel: interaction.message.channel,
            //         member: interaction.message.member,
            //         message: interaction.message,
            //         }
            // )
            // console.log(`You pressed a button!`);
        }
	},
};