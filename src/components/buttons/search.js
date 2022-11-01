module.exports = {
    data: {
        name: 'search'
    },
    async execute(interaction, client) {
        console.log('button');
        await interaction.reply({
            content: 'hi'
        }).catch(e => console.log(e))
    }
}