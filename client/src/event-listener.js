class EventListener {
    constructor() {
        this.dict = {}
    }

    register(event, obj, callback) {
        if (!obj) return
        const eventList = this.dict[event] || []
        eventList.push({ obj, callback })
        this.dict[event] = eventList
    }

    dispatch(event, argument={}) {
        const eventList = this.dict[event] || []
        eventList.forEach((eventInfo, i) => {
            if (!eventInfo.obj)
                eventList.splice(i, 1)
            else
                eventInfo.callback(argument)
        })
    }

    logout(event, obj){
        const eventList = this.dict[event] || []
        eventList.forEach((eventInfo, i) => {
            if(eventInfo.obj === obj){
                eventList.splice(i, 1)
            }
        })
    }
}

export default EventListener