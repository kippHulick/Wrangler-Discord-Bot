const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    userName: String,
    avatar: String,
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
})

module.exports = model('User', userSchema, 'users')