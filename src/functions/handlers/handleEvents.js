const fs = require('fs')
const path = require('node:path')
const { connection } = require('mongoose')

module.exports = (client) => {
    client.handleEvents = () => {

        const eventsPath = path.join(__dirname, '/..', '..', 'events');
        const eventFolders = fs.readdirSync(eventsPath)

        for (const folder of eventFolders) {
            const folderPath = path.join(eventsPath, folder);
            files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            switch (folder) {
                case 'discord':
                    for (const file of files) {
                        const filePath = path.join(folderPath, file)
                        const event = require(filePath);
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args));
                        } else {
                            client.on(event.name, (...args) => event.execute(...args));
                        }
                    }
                    break

                case 'distube':
                    for (const file of files) {
                        const filePath = path.join(folderPath, file)
                        const event = require(filePath);
                        if (event.once) {
                            client.distube.once(event.name, (...args) => event.execute(...args));
                        } else {
                            client.distube.on(event.name, (...args) => event.execute(...args));
                        }
                    }
                    break

                case 'mongo':
                    for (const file of files) {
                        const filePath = path.join(folderPath, file)
                        const event = require(filePath);
                        if (event.once) {
                            connection.once(event.name, (...args) => event.execute(...args, client));
                        } else {
                            connection.on(event.name, (...args) => event.execute(...args, client));
                        }
                    }
                    break
            }
        }
    }
}