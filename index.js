const fs = require('node:fs')
const path = require('node:path')
const { DisTube } = require('distube')
const { DiscordTogether } = require('discord-together')
require('dotenv').config()
const secrets = require('./src/utils/secrets')
const { connect } = require('mongoose')

//* Discord Settings *\\

const { 
	Client,
	Collection,
	GatewayIntentBits, 
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

client.colors = {
	primary: '0xF9a83a',
	spotify: '0x1DB954',
	youtube: '0xFF0000',
}

client.customEmojis = {
	spotify: '<:spotify:1042861901849305138>',
	soundcloud: '<:soundCloud:1042861828247658496>',
	youtube: '<:youTube:1042861956845023353>',
	custom: '<:scratch:1042861802523983962>'
}

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
(async () => {
	await connect(process.env.DB_TOKEN).catch(console.error)
})()
