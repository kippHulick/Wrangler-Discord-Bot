const fs = require('fs')
const path = require('node:path')

module.exports = (client) => {
    client.handleEvents = () => {
        const eventsPath = path.join(__dirname, '/..', '..', 'events', 'discord');
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
        const distubeEventsPath = path.join(__dirname, '/..', '..', 'events', 'distube');
        const distubeEventFiles = fs.readdirSync(distubeEventsPath).filter(file => file.endsWith('.js'));

        for (const file of distubeEventFiles) {
            const filePath = path.join(distubeEventsPath, file);
            const event = require(filePath);

            if (event.once) {
                client.distube.once(event.name, (...args) => event.execute(...args));
            } else {
                client.distube.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}