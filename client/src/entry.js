import React from 'react'
import Map from './map'
import Fundation from './fundation/fundation'
import PageMgr from './page-mgr'
import { MacroEventType, MacroViewType } from './macro'

class Entry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canPlay: false,
        }
    }

    onPlayClick() {
        app.metamask.canPlay().then(res => {
            let pass = true
            Object.keys(res).forEach(key => {
                if (!res[key]) pass = false
            })
            if (pass) {
                this.setState({ canPlay: pass, })
                app.contractMgr.fetchUserData(this.receiveUserData.bind(this))
            } else {
                const viewArgs = { check: res, }
                app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.LoginGuide, viewArgs })
            }
        })
    }

    receiveUserData() {
        console.log('receiveUserData', app.player.houseData)
    }

    render() {
        return <div className='entry'>
            <div className='entry-title'><img src='/images/title.png'></img></div>
            <Map />
            {this.state.canPlay ? <Fundation /> : <button className='entry-play' onClick={this.onPlayClick.bind(this)}><p>Play</p></button>}
            <PageMgr />
        </div>
    }
}

export default Entry