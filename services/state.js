const setState = {
    timeOut: false,

    setTimeOut(bool){ this.timeOut = bool },

    toggleTimeOut(){ this.timeOut ? this.timeOut = false : this.timeOut = true }

}

module.exports = setState