module.exports = async (client) => {
    client.handleErrors = async() => {
        errorChannel = '1036804075385266246'

        process.on('uncaughtException', async (err, origin) => {
            console.log(` [Anti-Crash] :: Uncaught Exception! check bot error channel for more info`);
            console.log({err, origin});
            const errorEmbed = await client.embeds.get('error').execute('Uncaught Exception', err, origin).catch(e => console.log(e))
            client.channels.cache.get(errorChannel).send(errorEmbed)
        })

        process.on('unhandledRejection', async (reason, promise) => {
            console.log(` [Anti-Crash] :: Unhandled Rejection! check bot error channel for more info`);
            console.log({reason});
            promise = await promise
            console.log({promise});
            const errorEmbed = await client.embeds.get('error').execute('Unhandled Rejection', reason, promise).catch(e => console.log(e))
            client.channels.cache.get(errorChannel).send(errorEmbed)
        })

        process.on('uncaughtExceptionMonitor', async (err, origin) => {
            console.log(` [Anti-Crash] :: Uncaught Exception (MONITOR)! check bot error channel for more info`);
            console.log({err, origin});
            const errorEmbed = await client.embeds.get('error').execute('Uncaught Exception (MONITOR)', err, origin).catch(e => console.log(e))
            client.channels.cache.get(errorChannel).send(errorEmbed)
        })

        process.on('multipleResolves', async (type, promise, reason) => {
            console.log(` [Anti-Crash] :: Multiple resolves!`);
            // console.log({type, reason});
            // console.log(await promise);
        })
    }
}