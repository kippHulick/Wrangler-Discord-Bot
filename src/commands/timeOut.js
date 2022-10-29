const state = require('./tools/state');


module.exports = {
	data: {
        "name": 'timeout',
        "aliases": ['to'],
    },

    execute: async (message, args) => {

        if(message.author.id === '137219201852112897'){
            message.delete()
            message.channel.send(`Sorry buddy, you can't do that!`)
        }

        state.toggleTimeOut()

        return message.channel.send(`Uh oh! Someone's been naughty it's timeout time!`)

    }
};
