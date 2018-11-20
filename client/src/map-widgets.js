import React from 'react'
import { MacroEventType, MacroViewType } from './macro'
import { getById } from './house-config'
import { logError } from './utils'

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
            active: false,
            isOwner: false,
        }
    }

    render() {
        if (!this.state.active) return null
        return <div className='map-bottom'>
            <div className='fundation-icon' onClick={this.onHomeClick.bind(this)}>
                <img src='/images/house.png'></img>
            </div>
            <div className='fundation-icon' onClick={this.onMarketClick.bind(this)}>
                <img src='/images/sale.png'></img>
            </div>
            <div className='fundation-icon' onClick={this.onMoveClick.bind(this)}>
                <img src='/images/travel.png'></img>
            </div>
            {this.renderOwner()}
        </div>

    }

    renderOwner() {
        if (!this.state.isOwner) return null
        return <div className='fundation-icon' onClick={this.onOwnerClick.bind(this)}>
            <img src='/images/owner.png'></img>
        </div>
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.PlayerMode, this, this.activeSelf.bind(this))
    }

    activeSelf() {
        this.setState({
            active: true
        })
        app.contractMgr.worldHouse.isOwner()
            .then(res => {
                this.setState({ isOwner: res })
            })
            .catch(err => logError(err))
    }

    onHomeClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageHome })
    }

    onMarketClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageMarket })
    }

    onMoveClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageMove })
    }

    onOwnerClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageOwner })
    }

}

class MapRight extends React.Component {
    constructor(props) {
        super(props)
        this.setate = {}
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.UpdateSurround, this, this.update.bind(this))
    }

    update() {
        this.setState({})
    }

    render() {
        const info = app.ownership.getLandInfo(this.props.selectedGrid)
        return <div className='map-right'>
            <p>{`Land: (${this.props.selectedGrid.r}, ${this.props.selectedGrid.c})`}</p>
            {info
                ? <img className='map-right-owned' src={`/images/${getById(info.id).img}`} />
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