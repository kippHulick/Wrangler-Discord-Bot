const { Schema, model } = require('mongoose')
const playlistSchema = new Schema({
    _id: Schema.Types.ObjectId,
    source: String,
    name: String,
    url: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    guild: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    guildPlays: { type: Number, default: 1 }
})

module.exports = model('Playlist', playlistSchema, 'playlists')