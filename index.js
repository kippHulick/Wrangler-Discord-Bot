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

//* Function Handling *\\

client.commands = new Collection();
client.aliases = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.embeds = new Collection();

const functionPath = path.join(__dirname, 'src/functions')
const functionFolders = fs.readdirSync(functionPath)

for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`${functionPath}/${folder}`)
		.filter((file) => file.endsWith('.js'))
	for (const file of functionFiles){ 
		require(`${functionPath}/${folder}/${file}`)(client)
	}
}

client.handleEvents()
client.handleCommands()
client.handleComponents()

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

client.login(process.env.TOKEN);