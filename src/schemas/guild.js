const { Schema, model } = require('mongoose')
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
})

module.exports = model('Guild', guildSchema, 'guilds')