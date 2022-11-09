const state = require('../../utils/state');

module.exports = {
	data: {
        "name": 'timeout',
        "aliases": ['to'],
    },

    execute: async (message, args) => {

        if(message.author.id === '137219201852112897'){
            await message.delete().catch(e => console.log(e))
            await message.channel.send(`Sorry buddy, you can't do that!`)
            return
        }

        state.toggleTimeOut()

        return state.timeOut ? 
        message.channel.send(`Uh oh! Someone's been naughty it's timeout time!`) :
        message.channel.send(`Alright buddy, you behave yourself now ok.`)

    }
};
