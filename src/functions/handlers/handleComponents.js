const fs = require('node:fs')

module.exports = (client) => {
    client.handleComponents = async() => {
        const componentPath = path.join(__dirname, 'src/functions')
        const componentFolders = fs.readdirSync(functionPath)
    }
}