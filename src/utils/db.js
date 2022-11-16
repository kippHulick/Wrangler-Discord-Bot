const mongoose = require('mongoose')

const userSchema = require('../schemas/user')
const guildSchema = require('../schemas/guild')
const playlistSchema = require('../schemas/playlist')
const songSchema = require('../schemas/song')

const db = {
    async newDefaultPlaylist(author, authorName){
        const playlistId = new mongoose.Types.ObjectId()
        const newPlaylist = new playlistSchema({
            _id: playlistId,
            source: guild.name,
            name: 'Default',
            author,
            authorName,
            guild: guild.name,
            songs: [],
            plays: 0
        })
        await newPlaylist.save()
        return playlistId
    },

    getSong:async (song) => await songSchema.findOne({ url: song.url }),

    async registerSong(song){
        let songDb = await this.getSong(song)
        if(!songDb){
            songDb = new songSchema({
                _id: new mongoose.Types.ObjectId(),
                name: song.name,
                url: song.url,
                songObj: song,
                plays: 1
            })
            songDb.save()
        }
        else {
            await songSchema.updateOne({ url: song.url }, { $inc: { plays: 1 }})
        }
        return songDb._id
    },

    async songPlays(song){
        const songDb = await this.getSong(song)
        return songDb.plays
    },

    async playPlaylist(playlist, user, message){
        let promises = []
        playlist.songs.forEach(song => promises.push(songSchema.findById(song._id.toString())))
        await Promise.all(promises).then(async songArr => {
            const playlistSongs = songArr.map(song => song.songObj.url)
            // console.log({playlistSongs});
            const distubePlaylist = await message.client.distube.createCustomPlaylist(playlistSongs, {
                member: message.member,
                properties: { name: `${user}'s Playlist`, source: "custom" },
                parallel: true
            });

            message.client.distube.play(
                message.member.voice.channel, distubePlaylist, {
                    textChannel: message.channel,
                    member: message.member,
                    message,
                }
            )
        })
    },

    async showPlaylist(playlist, message, opt = null){
        let promises = []
        playlist.songs.forEach(song => promises.push(songSchema.findById(song._id.toString())))
        await Promise.all(promises).then(async songArr => {
            const playlistSongs = songArr.map(song => {
                song.songObj.user = message.author
                return song.songObj
            })
            const q = { songs: playlistSongs }
            const pagination = await message.client.embeds.get('pagination').execute(message, q, opt)
        })
    },

    async getGuildProfile(guild){
        let guildProfile = await guildSchema.findOne({ guildId: guild.id })
        if(!guildProfile){
            const guild_id = new mongoose.Types.ObjectId()
            guildProfile = new guildSchema({
                _id: guild_id,
                guildId: guild.id,
                guildName: guild.name,
                playlists: [await this.newDefaultPlaylist(guild_id, guild.name)]
            })
            guildProfile.save()
        }
        return guildProfile
    },

    async getUserProfile(user){
        let userProfile = await userSchema.findOne({ userId: user.id })
        if(!userProfile) {
            const user_id = new mongoose.Types.ObjectId()
            userProfile = new userSchema({
                _id: user_id,
                userId: user.id,
                userName: user.username,
                avatar: user.avatarURL(),
                playlists: [await this.newDefaultPlaylist(user_id, user.username)]
            })
            userProfile.save()
        }
        return userProfile
    },

    async addSongToPlaylist(playlist_id, song_id){
        let playlist = await playlistSchema.findOne(playlist_id)
        if(!playlist.songs.includes(song_id.toString())){
            await playlistSchema.updateOne({ _id: playlist._id }, { songs: [...playlist.songs, song_id] })
        }
    },

    async addSongToDefaultPlaylists(song_id, userProfile, guildProfile){
        let guildDefaultPlaylist = await playlistSchema.findOne(guildProfile.playlists[0])
        let userDefaultPlaylist = await playlistSchema.findOne(userProfile.playlists[0])

        if(!userDefaultPlaylist.songs.includes(song_id.toString())){
            await playlistSchema.updateOne({ _id: userDefaultPlaylist._id }, { songs: [...userDefaultPlaylist.songs, song_id] })
        }

        if(!guildDefaultPlaylist.songs.includes(song_id.toString())){
            await playlistSchema.updateOne({ _id: guildDefaultPlaylist._id }, { songs: [...guildDefaultPlaylist.songs, song_id] })
        }
    },

    async setDefaults(queue, song){
        const { guild } = queue.textChannel
        const { user } = song

        const song_id = await this.registerSong(song)
        const userProfile = await this.getUserProfile(user)
        const guildProfile = await this.getGuildProfile(guild)
        this.addSongToDefaultPlaylists(song_id, userProfile, guildProfile)
    },


    async getUserDefaultPlaylist(user){
        const userProfile = await this.getUserProfile(user)
        const userPlaylist = await playlistSchema.findById(userProfile.playlists[0])
        return userPlaylist
    },

    async getGuildDefaultPlaylist(guild){
        const guildProfile = await this.getGuildProfile(guild)
        return await playlistSchema.findOne(guildProfile.playlists[0])
    },
}

module.exports = db