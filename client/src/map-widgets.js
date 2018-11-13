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

class MapBottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        if (!this.state.active) return null
        return <div className='map-bottom'>
            <div className='fundation-icon' onClick={this.onHomeClick.bind(this)}>
                <img src='/images/house.png'></img>
            </div>
        </div>

    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.PlayerMode, this, this.activeSelf.bind(this))
    }

    activeSelf() {
        this.setState({
            active: true
        })
    }

    onHomeClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageHome })
    }
}

class MapRight extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='map-right'>
            <p>{`Land: (${this.props.selectedGrid.r}, ${this.props.selectedGrid.c})`}</p>
            {app.ownership.getLandOwner(this.props.selectedGrid)
                ? <img className='map-right-owned' src='/images/house.png'/>
                : app.player.hasHouse()
                    ? <button onClick={this.onMoveClick.bind(this)}>Move</button>
                    : <button onClick={this.onMarketClick.bind(this)}>Purchase</button>
            }
        </div>
    }

    onMoveClick() {
        app.eventListener.dispatch(
            MacroEventType.ShowView,
            { viewName: MacroViewType.PageMove, viewArgs: this.props.selectedGrid }
        )
    }

    onMarketClick() {
        app.eventListener.dispatch(
            MacroEventType.ShowView,
            { viewName: MacroViewType.PageMarket, viewArgs: this.props.selectedGrid }
        )
    }
}

class MapLogo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    activeSelf() {
        this.setState({
            active: true
        })
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.PlayerMode, this, this.activeSelf.bind(this))
    }

    render() {
        if (!this.state.active) return null
        return <div className='map-logo'>
            <img src='/images/title.png'></img>
        </div>
    }
}

export {
    MapFace,
    MapBottom,
    MapRight,
    MapLogo,
}