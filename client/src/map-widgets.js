import React from 'react'
import { MacroEventType, MacroViewType } from './macro'

class MapFace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canPlay: false,
        }
    }

    render() {
        if (this.state.canPlay) return null
        return <div className='map-face'>
            <div className='map-title'><img src='/images/title.png'></img></div>
            <button className='map-play' onClick={this.onPlayClick.bind(this)}><p>Play</p></button>
        </div>
    }

    onPlayClick() {
        app.metamask.canPlay().then(res => {
            let pass = true
            Object.keys(res).forEach(key => {
                if (!res[key]) pass = false
            })
            if (pass) {
                this.setState({ canPlay: pass, })
                app.enterPlayerMode()
            } else {
                const viewArgs = { check: res, }
                app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageGuide, viewArgs })
            }
        })
    }
}

export {
    MapFace,
}