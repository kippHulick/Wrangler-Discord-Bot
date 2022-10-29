const fs = require('node:fs')
const path = require('node:path')

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandsPath = path.join(__dirname, '..', '..', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
            client.commands.set(command.data.name, command);
            if (command.data.aliases) command.data.aliases.forEach(alias => client.aliases.set(alias, command.data.name));
        }
    }
}