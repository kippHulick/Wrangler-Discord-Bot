const fs = require('node:fs')
const path = require('node:path')
const { DisTube } = require('distube')
require('dotenv').config()

const { 
	Client,
	Collection,
	GatewayIntentBits, 
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} = require("discord.js")


const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	]
})

//* DisTube Settings *\\

const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { SoundCloudPlugin } = require('@distube/soundcloud')

client.distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 10,
	leaveOnEmpty: false,
	leaveOnStop: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
			api: {
				clientId: process.env.SPOTIFY_ID,
				clientSecret: process.env.SPOTIFY_SECRET
			}
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin()
	]
})

//* Command Handling *\\

client.commands = new Collection();
client.aliases = new Collection();

const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	if (command.data.aliases) command.data.aliases.forEach(alias => client.aliases.set(alias, command.data.name));
}

//* Event Handling *\\

const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Queue status template
const status2 = queue2 => {
	return `Volume: \`${queue.volume}%\`  | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
}

const status = queue => [
		{ name: 'Volume', value: `${queue.volume}` },
		{ name: 'Loop', value: queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off', inline: true },
		{ name: 'Autoplay', value: queue.autoplay ? 'On' : 'Off', inline: true },
		// { name: 'Inline field title', value: 'Some value here', inline: true },
	]
// DisTube event listeners
client.distube
	.on('playSong', (queue, song) => {
		const playSongEmbed = new EmbedBuilder()
			.setColor(0x3498db)
			.setTitle(`${song.name}`)
			// .setAuthor({ name: `${song.user.username}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.addFields(status(queue))
			.setFooter({ text: `Added by ${song.user.username}` })

			// queue.textChannel?.send(
			// 	`Playing \`${song.name}\` - \`${
			// 		song.formattedDuration
			// 	}\`\nRequested by: ${song.user.username}\n${status(queue)}`,

		queue.textChannel.send({ embeds: [playSongEmbed] })
	})
	.on('addSong', (queue, song) =>
		queue.textChannel?.send(
			`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.username}`,
		),
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel?.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		),
	)
	.on('error', (textChannel, e) => {
		console.error(e);
		textChannel.send(
			`An error encountered: ${e.message.slice(0, 1970)}`,
		);
	})
	.on('finish', queue => queue.textChannel?.send('Finish queue!'))
	// .on('finishSong', queue =>
	// 	queue.textChannel?.send('Finish song!'),
	// )
	.on('disconnect', queue =>
		queue.textChannel?.send('Disconnected!'),
	)
	.on('empty', queue =>
		queue.textChannel?.send(
			'The voice channel is empty! Leaving the voice channel...',
		),
	)
	// DisTubeOptions.searchSongs > 1
	.on('searchResult', async (message, result) => {

		const fields = result.map((song, i) => {
			return { name: `${i + 1}`, value: `${song}` }
		})

<<<<<<< HEAD
		// console.log(fields);
=======
		// console.log(fields);
>>>>>>> 90b8478 (embed messages for play command)

		const buttons = () => {
			const buttons = []
			for( let i = 1; i <=5; i++){
				buttons.push( new ButtonBuilder()
					.setCustomId('primary')
					.setLabel(`${i}`)
					.setStyle(ButtonStyle.Primary)
				)
			}
			return buttons
		}

		const buttonsRow = new ActionRowBuilder()
			.addComponents(new ButtonBuilder()
			.setCustomId('primary')
			.setLabel(`1`)
			.setStyle(ButtonStyle.Primary))

		const searchResult = new EmbedBuilder()
			.setColor(0x3498db)
			.setTitle('Choose an option below!')
			.addFields(result.map((song, i) => {
				return { name: `${i + 1}`, value: `${song}` }
			}))

			await message.channel.send({ embeds: [searchResult], components: [buttonsRow] })
		// let i = 0;
		// message.channel.send(
		// 	`**Choose an option from below**\n${result
		// 		.map(
		// 			song =>
		// 				`**${++i}**. ${song.name} - \`${
		// 					song.formattedDuration
		// 				}\``,
		// 		)
		// 		.join(
		// 			'\n',
		// 		)}\n*Enter anything else or wait 30 seconds to cancel*`,
		// );
	})
	.on('searchCancel', message =>
		message.channel.send('Searching canceled'),
	)
	.on('searchInvalidAnswer', message =>
		message.channel.send('Invalid number of result.'),
	)
	.on('searchNoResult', message =>
		message.channel.send(`Sorry ${message.member} there was no result for your search`),
	)
	// .on('searchNoResult', message =>
	// 	message.channel.send('No result found!'),
	// )
	.on('searchDone', () => {});

client.login(process.env.TOKEN);
