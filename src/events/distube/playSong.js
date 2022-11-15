const { 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")

const mongoose = require('mongoose')

const userSchema = require('../../schemas/user')
const guildSchema = require('../../schemas/guild')
const playlist = require('../../schemas/playlist')
const songSchema = require('../../schemas/song')

module.exports = {
	name: 'playSong',
	async execute(queue, song) {
        const { guild } = song.member
        const { user } = song
        const { client } = queue.distube

        let songDb = await songSchema.findOne({ url: song.url })
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

        const defaultPlaylist = async (author, authorName) => {
            const playlistId = new mongoose.Types.ObjectId()
            const newPlaylist = new playlist({
                _id: playlistId,
                source: guild.name,
                name: 'Default',
                author,
                authorName,
                guild: guild.name,
                songs: [songDb._id],
                plays: 0
            })
            await newPlaylist.save()
            return playlistId
        }
        
        let userProfile = await userSchema.findOne({ userId: user.id })
        if(!userProfile) {
            const userDbId = new mongoose.Types.ObjectId()
            userProfile = new userSchema({
                _id: userDbId,
                userId: user.id,
                userName: user.username,
                avatar: user.avatarURL(),
                playlists: [await defaultPlaylist(userDbId, user.username)]
            })
            userProfile.save()
        } else {
            let userDefaultPlaylist = await playlist.findOne(userProfile.playlists[0])
            if(!userDefaultPlaylist) {
                userDefaultPlaylistId = await defaultPlaylist(userProfile._id, userProfile.userName)
                await userSchema.updateOne({ _id: userProfile._id.toString() }, { playlist: [userDefaultPlaylistId]})
                userDefaultPlaylist = await playlist.findById(userProfile.playlists[0])
            }
            if(!userDefaultPlaylist.songs.includes(songDb._id.toString())){
                await playlist.updateOne({ _id: userDefaultPlaylist._id }, { songs: [...userDefaultPlaylist.songs, songDb._id] })
            }
        }

        let guildProfile = await guildSchema.findOne({ guildId: guild.id })
        if(!guildProfile){
            const guild_id = new mongoose.Types.ObjectId()
            guildProfile = new guildSchema({
                _id: guild_id,
                guildId: guild.id,
                guildName: guild.name,
                playlists: [await defaultPlaylist(guild_id, guild.name)]
            })
            guildProfile.save()
        }
        else {
            let guildDefaultPlaylist = await playlist.findOne(guildProfile.playlists[0])
            if(!guildDefaultPlaylist.songs.includes(songDb._id.toString())){
                await playlist.updateOne({ _id: guildDefaultPlaylist._id }, { songs: [...guildDefaultPlaylist.songs, songDb._id] })
            }
        }
        // console.log({userProfile, songDb, guildProfile});

        const songEmbed = await client.embeds.get('song').execute(queue, song)
		const message = await queue.textChannel.send({ embeds: [songEmbed] })

        try {
            message.react('🇶')
            message.react('🔉')
            message.react('🔊')
            message.react('🔀')
            message.react('🔁')
            message.react('🔄')
            if (queue.previousSongs.length > 0) message.react('⏮')
            message.react('⏹')
            message.react('⏭')
            message.react('⏸')
        } catch (error) {
            console.log(error);
        }

        const filter = (reaction, user) => !(user.id === '1023049554884575262')

        const collector = message.createReactionCollector({ filter, time: Number(song.duration) * 1000 })

        collector.on('collect', async (reaction, user) => {
            const emoji = reaction.emoji.name
            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
            switch (emoji) {
                case '⏮':
                    client.commands.get('previous').execute(message)
                    collector.stop()
                    break

                case '⏸':
                    message.reactions.cache.get('⏸').remove().catch(e => console.log(e))
                    message.react('▶️')
                    client.commands.get('pause').execute(message)
                    break

                case '▶️':
                    message.reactions.cache.get('▶️').remove().catch(e => console.log(e))
                    message.react('⏸')
                    client.commands.get('pause').execute(message)
                    break

                case '⏹':
                    client.commands.get('stop').execute(message)
                    collector.stop()
                    break

                case '⏭':
                    client.commands.get('skip').execute(message)
                    collector.stop()
                    break

                case '🔉':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        volDown = queue.volume >= 10 ? queue.volume - 10 : 0
                        client.commands.get('volume').execute(message, [String(volDown)])
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔊':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        volUp = queue.volume <= 90 ? queue.volume + 10 : 100
                        client.commands.get('volume').execute(message, [String(volUp)])
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🔀':
                    client.commands.get('shuffle').execute(message)
                    break

                case '🔁':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        switch(queue.repeatMode){
                            case 0:
                                arg = 'song'
                                break
                            case 1:
                                arg = 'queue'
                                break
                            case 2:
                                arg = 'off'
                                break
                        }
                        client.commands.get('repeat').execute(message, [arg])
                    } catch (error) {
                        console.log(error);
                    }
                    
                    break

                case '🔄':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id).catch(e => console.log(e))
                        }
                        
                        client.commands.get('autoplay').execute(message)
                    } catch (error) {
                        console.log(error);
                    }
                    break

                case '🇶':
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id)
                        }
                        message.member = user
                        message.user = user
                        client.commands.get('queue').execute(message)
                    } catch (error) {
                        console.log(error)
                    }
                    break
            }
        })

        collector.on('end', (col) => {
            const finalEmbed = new EmbedBuilder()
                .setColor(client.colors.primary)
                .setTitle(`| Finished Playing |`)
                .setDescription(`[${song.name}](${song.url})`)
                .setThumbnail(`${song.thumbnail}`)
            message.reactions.removeAll().catch(e => console.log(e))
            message.edit({ embeds: [finalEmbed] })
        })
	},
};