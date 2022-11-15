const { 
	EmbedBuilder,
} = require("discord.js")

const mongoose = require('mongoose')
const format = require('../../utils/format')

const userSchema = require('../../schemas/user')
const guildSchema = require('../../schemas/guild')
const playlistSchema = require('../../schemas/playlist')
const songSchema = require('../../schemas/song')

module.exports = {
    data: {
        "name": 'playlist',
        "aliases": ['pl'],
        description: 'Usage: \`;pl show <user/server/name>\`, \`;pl play <user/server/name>\`, \`;pl create <user/server> <name>\`, \`;pl delete <name>\`'
    },

    async execute(message, args) {
        const { client, guild } = message
        const user = message.author
        if(!args) return message.channel.send(this.data.description)

        const playPlaylist = async (playlist, user) => {
            let promises = []
            playlist.songs.forEach(song => promises.push(songSchema.findById(song._id.toString())))
            await Promise.all(promises).then(async songArr => {
                const playlistSongs = songArr.map(song => song.songObj.url)
                const distubePlaylist = await client.distube.createCustomPlaylist(playlistSongs, {
                    member: message.member,
                    properties: { name: `${user}'s Playlist`, source: "custom" },
                    parallel: true
                });

                client.distube.play(
                    message.member.voice.channel, distubePlaylist, {
                        textChannel: message.channel,
                        member: message.member,
                        message,
                    }
                )
            })
        }

        const showPlaylist = async (playlist) => {
            let promises = []
            playlist.songs.forEach(song => promises.push(songSchema.findById(song._id.toString())))
            await Promise.all(promises).then(async songArr => {
                const playlistSongs = songArr.map(song => {
                    song.songObj.user = user
                    return song.songObj
                })
                const q = { songs: playlistSongs }
                const pagination = await message.client.embeds.get('pagination').execute(message, q)
            })
        }

        const getUserProfile = async () => {
            let userProfile = await userSchema.findOne({ userId: user.id })
            if(!userProfile) {
                const userDbId = new mongoose.Types.ObjectId()
                userProfile = new userSchema({
                    _id: userDbId,
                    userId: user.id,
                    userName: user.username,
                    avatar: user.avatarURL(),
                    playlists: []
                })
                userProfile.save()
            }
            return userProfile
        }

        const getUserPlaylist = async () => {
            const userProfile = await getUserProfile()
            const userPlaylist = await playlistSchema.findById(userProfile.playlists[0])
            return userPlaylist
        }

        const getguildPlaylists = async () => {
            let guildProfile = await guildSchema.findOne({ guildId: guild.id })
            return await playlistSchema.findOne(guildProfile.playlists[0])
        }

        switch(args[0]){
            case 'show':
                if(args.length < 2) return message.channel.send('Default playlists are \`<me>\` and \`<server>\`\nEx: \`;pl show me\`')
                else {
                    switch(args[1]){
                        case 'me':
                            const userPlaylist = await getUserPlaylist()
                            showPlaylist(userPlaylist)
                            break

                        case 'server':
                            const serverPlaylist = await getguildPlaylists()
                            showPlaylist(serverPlaylist)
                            break

                        default:
                            break
                    }
                }
                break

            case 'play':
                if(args.length < 2) return message.channel.send('Default playlists are \`<me>\` and \`<server>\`\nEx: \`;pl play me\`')
                switch(args[1]){
                    case 'me':
                        const userPlaylist = await getUserPlaylist()
                        playPlaylist(userPlaylist, user.username)
                        break

                    case 'server':
                        const serverPlaylist = await getguildPlaylists()
                        playPlaylist(serverPlaylist, 'The Server')
                        break

                    default:
                        break
                }
                break

            case 'create':
                break

            case 'delete':
                break

            default:
                return message.channel.send(this.data.description)
        }
        //ToDo ;pl show <user/server/name>
        //ToDo ;pl play <user/server/name>
        //ToDo ;pl create <user/server> <name>
        //ToDo ;pl delete <name> ** set up playlist perms?
    }
}