const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

module.exports = {
    data: {
        name: 'error'
    },
    async execute(type, error = null, origin = null, reason = null) {
        fields = []
        if(error)fields.push({ name: 'Error', value: `${String(error).slice(0, 1024)}`})
        if(origin)fields.push({ name: 'origin', value: `${String(origin).slice(0, 1024)}`})
        if(reason) fields.push({ name: 'Reason', value: `${String(reason).slice(0, 1024)}` })
        return new EmbedBuilder()
            .setColor(0xc90e17)
            .setTitle(`⚠️ NEW ERROR ⚠️`)
            .setDescription(`An error just occurred :: \`${type}\``)
            .addFields(fields)
            .setTimestamp()
            .setFooter({ text: 'Anti-Crash System' })

    }
}