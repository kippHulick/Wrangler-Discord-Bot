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
	leaveOnEmpty: true,
	leaveOnStop: true,
	nsfw: true,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
			api: {
				clientId: process.env.SPOTIFY_ID,
				clientSecret: process.env.SPOTIFY_SECRET
			}
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin({ update: true })
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

client.searchTime = 20000 // 20 seconds in ms

client.colors = {
	primary: 0xF9a83a,
	spotify: 0x1DB954,
	youtube: 0xFF0000,
}

client.botId = ['1023049554884575262', '1103971669766320200'] // Wrangler || Test Wrangler \\

client.customEmojis = {
	spotify: '<:spotify:1042861901849305138>',
	soundcloud: '<:soundcloud:1043180252354072608>',
	youtube: '<:youTube:1042861956845023353>',
	custom: '<:scratch:1042861802523983962>',
	q: '🇶',
	volDown: '🔉',
	volUp: '🔊',
	shuffle: '🔀',
	loop: '🔁',
	autoPlay: '🔄',
	previous: '⏮',
	stop: '⏹',
	skip: '⏭',
	pause: '⏸',
	play: '▶️',
	1: '1️⃣',
	2: '2️⃣',
	3: '3️⃣',
	4: '4️⃣',
	5: '5️⃣',
	6: '6️⃣',
	7: '7️⃣',
	8: '8️⃣',
	9: '9️⃣',
	10: '🔟',
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
