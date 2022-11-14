const { Schema, model } = require('mongoose')
const songSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    url: String,
    songObj: Object,
    plays: { type: Number, default: 1 }
})

module.exports = model('Song', songSchema, 'songs')