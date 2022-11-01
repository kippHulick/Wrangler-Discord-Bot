module.exports = {
    data: {
        name: 'searchmenu'
    },
    async execute(interaction, client) {
        console.log('searchmenu');
        console.log({interaction});
        await interaction.reply({
            content: `You selected: ${interaction.values}`
        }).catch(e => console.log(e))
    }
}