import React from 'react'
import ReactDOM from 'react-dom'
import Map from './map'
import ImageMgr from './image-mgr'
import Ownership from './ownership'
import Metamask from './metamask'
import { check } from './login-check'
import Fundation from './fundation/fundation'
import EventListener from './event-listener'
import PageMgr from './page-mgr'
import { MacroEventType, MacroViewType } from './macro'
import SolMgr from './sol/sol-mgr'

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
                window.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.LoginGuide, viewArgs })
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

window.imageMgr = new ImageMgr()
window.ownership = new Ownership()
window.metamask = new Metamask()
window.eventListener = new EventListener()
window.solMgr = new SolMgr()

window.imageMgr.loadImages(() => {
    ReactDOM.render(
        <Entry />,
        document.getElementById('root')
    )
})
