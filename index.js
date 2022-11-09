const fs = require('node:fs')
const path = require('node:path')
const { DisTube } = require('distube')
const { DiscordTogether } = require('discord-together')
require('dotenv').config()
const secrets = require('./src/utils/secrets')

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
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildEmojisAndStickers,
	]
})

//* DisTube and Discord Settings *\\

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
	],
	youtubeCookie: secrets.youTubeCookie
})

client.discordTogether = new DiscordTogether(client);

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
// client.handleErrors()

client.login(process.env.TOKEN);