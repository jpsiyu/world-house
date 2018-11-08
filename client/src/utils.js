const LogSwitch = true

const log = (...args) => {
    if (LogSwitch)
        console.log(...args)
}

const logError = (err) => {
    if(LogSwitch)
        console.log(err.name, err.message, err.stack)
}

export { log, logError }