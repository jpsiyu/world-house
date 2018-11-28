import { MacroEventType } from './macro'

const LogSwitch = false

const log = (...args) => {
    if (LogSwitch)
        console.log(...args)
}

const logError = (err) => {
    if (LogSwitch)
        console.log(err.name, err.message, err.stack)
}

const notice = (msg, callback = null) => {
    app.eventListener.dispatch(
        MacroEventType.Notice,
        { msg, callback }
    )
}

const accountForShort = (account) => {
    return `${account.slice(0, 6)}...`
}

export { log, logError, notice, accountForShort }