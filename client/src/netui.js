import { MacroEventType } from './macro'

const start = () => {
    return new Promise((resolve, reject) => {
        app.eventListener.dispatch(MacroEventType.Loading, { show: true })
        resolve()
    })
}


const stop = () => {
    return new Promise((resolve, reject) => {
        app.eventListener.dispatch(MacroEventType.Loading, { show: false })
        resolve()
    })
}

export default {
    start,
    stop,
}