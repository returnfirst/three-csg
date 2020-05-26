function log(txt) {
    console.warn('log() will be deprecated in the near future: please use console.log/warn/error instead');
    var timeInMs = Date.now();
    var prevtime; // OpenJsCad.log.prevLogTime
    if (!prevtime) prevtime = timeInMs;
    var deltatime = timeInMs - prevtime;
    log.prevLogTime = timeInMs;
    var timefmt = (deltatime * 0.001).toFixed(3);
    txt = '[' + timefmt + '] ' + txt;
    if (typeof console === 'object' && typeof console.log === 'function') {
        console.log(txt);
    } else if (typeof self === 'object' && typeof self.postMessage === 'function') {
        self.postMessage({ cmd: 'log', txt: txt });
    } else throw new Error('Cannot log');
}

// See Processor.setStatus()
// Note: leave for compatibility
function status(s) {
    log(s);
}

export { log, status };
