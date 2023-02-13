const EventEmitter = require('events');
class TimeEmiter extends EventEmitter { };
const emitter = new TimeEmiter();

let a = process.argv;

emitter.on('timerTick', ([controlDate, timer]) => {
    const currentTime = new Date();
    if (currentTime >= controlDate) {
        emitter.emit('timerEnd', timer);
    } else {
        console.log(`days: ${Math.floor((controlDate - currentTime) / 3600 / 1000 / 24)},` +
            `hours: ${Math.floor(((controlDate - currentTime) / 3600 / 1000) % 24)},` +
            `minutes: ${Math.floor(((controlDate - currentTime) / 60 / 1000) % 60)},` +
            `seconds: ${Math.floor((controlDate - currentTime / 1000) % 60)}`);
    }
});

emitter.on('timerEnd', timer => {
    clearInterval(timer);
    console.log("Time is over")
});

const ticktock = (controlDate) => {
    setInterval(function () {
        emitter.emit("timerTick", [controlDate, this])
    }, 1000)
}

for (const arg of a.slice(2)) {
    const [hour, day, month, year] = arg.split('-')
    const controlDate = new Date(year, month - 1, day, hour)
    if (isNaN(controlDate)) continue
    ticktock(controlDate)

}