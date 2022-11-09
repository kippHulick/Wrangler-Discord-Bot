const fs = require('node:fs')
const path = require('node:path')
const { DisTube } = require('distube')
const { DiscordTogether } = require('discord-together')
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
	youtubeCookie: 'SID=QAjdj7HovSpi-r5jq0AWB4A1PE82F0p40GoKbfqjUiRqLEaTBNN4R5ySpcE-UI3mo3GcYA.; __Secure-1PSID=QAjdj7HovSpi-r5jq0AWB4A1PE82F0p40GoKbfqjUiRqLEaTEAqJd13rXGm8IOdpxTXkbA.; __Secure-3PSID=QAjdj7HovSpi-r5jq0AWB4A1PE82F0p40GoKbfqjUiRqLEaTAmo4M_qxBR0GUuoghqLZig.; HSID=A5JkgcK4xRHzwbiNw; SSID=Akl_fV1Y07ymCpp-5; APISID=dHZtVqIMbzvVwcg-/Aq0sLYl7tMe_zEApc; SAPISID=qZGO2w89gCT9-bAb/AIwCZsuKI5R4cb3W-; __Secure-1PAPISID=qZGO2w89gCT9-bAb/AIwCZsuKI5R4cb3W-; __Secure-3PAPISID=qZGO2w89gCT9-bAb/AIwCZsuKI5R4cb3W-; LOGIN_INFO=AFmmF2swRQIhAIEvYbXkPJuC_avTkLheRpcdAG8GyYP_I_yQ6SHWvc8xAiBjNlpG_HxeEkXgoVKLvkisrggv8MINBTg9VFo2oSVGxQ:QUQ3MjNmeVFzT3FZc3FmWUZjSmVRSUdhTnFXbDlpaGExTV83dnJGbEpfNEQxMVpZLWktWVF0anBGR2xXdXdUd3FxcUhYZUw2ZmJjUERoWmFkQ21RakUwVGtBQ0JIczM0WUxrM1l0NGtreEd4Zl93aTNNQU5PenlhcU9EcS1WVWhvQ2lwUFF2N0ZYbW5aUk5EMGV2dE80TzVuR0dnUG9tZUpB; VISITOR_INFO1_LIVE=0tIQnglQP4E; SIDCC=AIKkIs0lCTkFByA4URYNQOXnLd3jxqv4sx66fRJVi41czFoLnSyHdEPZ8gVAh3zne1C78syzKhM; __Secure-1PSIDCC=AIKkIs09xSG1v6ruX3pmIcit3aHuBFvOiZzSWrI6f2IqBKSlCXjbcRIPpbOaS6VMBIc9mMGlPuc; __Secure-3PSIDCC=AIKkIs2uRi0ieiVgljla83s_JTTSP_kGGfG-p7-KZgSkze70vThSBHgTr3kL1HQlLEeneKC92nI; PREF=tz=America.Chicago&f6=40000000&f4=4000000&f5=20000&f7=100; YT_CL={"loctok":"APLXd66ADn6MXKS3sElLSauoWc1wQD99jXDNwjbnfaCmceYlPoFxKblpsbgHR8HjLUkXTESUqsTrsvEXX0fVQOTeyRLFmg"}; YSC=rGqUdAvDZP0; wide=1'
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