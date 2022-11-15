const { 
	EmbedBuilder,
} = require("discord.js")

const mongoose = require('mongoose')

const userSchema = require('../../schemas/user')
const guildSchema = require('../../schemas/guild')
const playlist = require('../../schemas/playlist')
const songSchema = require('../../schemas/song')

module.exports = {
    data: {
        "name": 'playlist',
        "aliases": ['pl'],
        description: 'Usage: \`;pl show <user/server/name>\`, \`;pl play <user/server/name>\`, \`;pl create <user/server> <name>\`, \`;pl delete <name>\`'
    },

    async execute(message, args) {
        console.log(args);
        const { client } = message
        const user = message.author
        if(!args) return message.channel.send(this.data.description)

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

        switch(args[0]){
            case 'show':
                if(args.length < 2){
                    console.log('showing default playlists');
                    
                }
                break

            case 'play':
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