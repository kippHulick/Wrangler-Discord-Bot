const fs = require('fs')
const data = require('./state.json')

const state = {
    timeOut: false,

    setTimeOut(bool){ this.timeOut = bool },

    toggleTimeOut(){ this.timeOut ? this.timeOut = false : this.timeOut = true },

    setPrefix(server, prefix){ data[server] = prefix }
}

module.exports = state