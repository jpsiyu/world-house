import React from 'react'
import Map from './map'
import { check } from './login-check'
import Fundation from './fundation/fundation'
import PageMgr from './page-mgr'
import { MacroEventType, MacroViewType } from './macro'

class Entry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
        }
    }

    onPlayClick() {
        check().then(res => {
            let pass = true
            Object.keys(res).forEach(key => {
                if (!res[key]) pass = false
            })
            if (pass) {
                this.setState({ login: pass, })
            } else {
                const viewArgs = { check: res, }
                app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.LoginGuide, viewArgs })
            }
        })
    }

    render() {
        return <div className='entry'>
            <div className='entry-title'><img src='/images/title.png'></img></div>
            <Map />
            {this.state.login ? <Fundation /> : <button className='entry-play' onClick={this.onPlayClick.bind(this)}><p>Play</p></button>}
            <PageMgr />
        </div>
    }
}

export default Entry