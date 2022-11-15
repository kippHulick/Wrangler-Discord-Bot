module.exports = {
    name: "disconnected",
    async execute(err){
        console.log(`  [Database Status]: ERROR\n${await err}`);
    }
}