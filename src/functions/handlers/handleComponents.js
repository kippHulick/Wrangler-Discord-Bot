const path = require('node:path')
const fs = require('node:fs')

module.exports = (client) => {
    const { buttons, selectMenus, embeds } = client

    client.handleComponents = async() => {
        const componentPath = path.join(__dirname, '..', '..', 'components');
        const componentFolders = fs.readdirSync(componentPath)

        for (const folder of componentFolders) {
            const folderPath = path.join(componentPath, folder)
            files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            switch (folder) {
                case "buttons":
                    for (const file of files) {
                        const filePath = path.join(folderPath, file)
                        const button = require(filePath)
                        buttons.set(button.data.name, button)
                    }
                    break

                case 'selectMenus':
                    for(const file of files) {
                        const filePath = path.join(folderPath, file)
                        const menu = require(filePath)
                        selectMenus.set(menu.data.name, menu)
                    }

                case 'embeds':
                    for(const file of files) {
                        const filePath = path.join(folderPath, file)
                        const menu = require(filePath)
                        embeds.set(menu.data.name, menu)
                    }

            }
        }
    }
}