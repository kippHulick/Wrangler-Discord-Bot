const state = {
    timeOut: false,
    songs: [],

    setTimeOut(bool){ this.timeOut = bool },
    toggleTimeOut(){ this.timeOut ? this.timeOut = false : this.timeOut = true },

    setSongs(arr){this.songs = arr}

}

module.exports = state