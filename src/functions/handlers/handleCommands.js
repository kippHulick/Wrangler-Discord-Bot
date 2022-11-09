const fs = require('node:fs')
const path = require('node:path')

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandsPath = path.join(__dirname, '..', '..', 'commands');
        const commandFolders = fs.readdirSync(commandsPath)

        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'))

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file)
                const command = require(filePath)
                client.commands.set(command.data.name, command);
                if (command.data.aliases) command.data.aliases.forEach(alias => client.aliases.set(alias, command.data.name));
            }
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
        }
    }
}