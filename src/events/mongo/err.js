module.exports = {
    name: "disconnected",
    execute(err){
        console.log(`  [Database Status]: ERROR\n${err}`);
    }
}