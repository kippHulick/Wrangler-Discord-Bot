const { 
	EmbedBuilder,
} = require("discord.js")

const mongoose = require('mongoose')
const db = require('../../utils/db')

module.exports = {
    data: {
        "name": 'playlist',
        "aliases": ['pl'],
        description: `Every user and server have a playlist by default, use \`;pl show me\` to see your songs and \`;pl show server\` to see the servers'.\nUsage: \`;pl show <user/server> <name>\`, \`;pl play <user/server> <name>\`, \`;pl create <user/server> <name>\`, \`;pl delete <user/server> <name>\``
    },

    async execute(message, args) {
        const { client, guild } = message
        const user = message.author
        if(!args) return message.channel.send(this.data.description)

        switch(args[0]){
            case 'show':
                if(args.length < 2) return message.channel.send('Default playlists are \`<me>\` and \`<server>\`\nEx: \`;pl show me\`')
                else {
                    switch(args[1]){
                        case 'me':
                            const userPlaylist = await db.getUserDefaultPlaylist(user)
                            db.showPlaylist(userPlaylist, message, { playlistName: `${user.username}'s Playlist` })
                            break

                        case 'server':
                            const serverPlaylist = await db.getGuildDefaultPlaylist(guild)
                            db.showPlaylist(serverPlaylist, message, { playlistName: `${guild.name} Server Playlist` })
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
                        const userPlaylist = await db.getUserDefaultPlaylist(user)
                        db.playPlaylist(userPlaylist, user.username, message)
                        break

                    case 'server':
                        const serverPlaylist = await db.getGuildDefaultPlaylist(guild)
                        db.playPlaylist(serverPlaylist, 'The Server', message)
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