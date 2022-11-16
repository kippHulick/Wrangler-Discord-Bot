const formatInt = (int) => (int < 10 ? `0${int}` : int);

const format = {
    time(sec){
        if (!sec || !Number(sec)) return "00:00";
    const seconds = Math.round(sec % 60);
    const minutes = Math.floor((sec % 3600) / 60);
    const hours = Math.floor(sec / 3600);
    if (hours > 0) return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
    if (minutes > 0) return `${formatInt(minutes)}:${formatInt(seconds)}`;
    return `00:${formatInt(seconds)}`;
    }
}

module.exports = format