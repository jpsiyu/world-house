import React from 'react'
import { MacroEventType, MacroViewType, MacroMap } from './macro'
import { getById } from './house-config'
import { logError } from './utils'
import LandPos from './drawing/land-pos'

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
            <button className='btn-violet btn-large btn-shadow' onClick={this.onPlayClick.bind(this)}><p>Play</p></button>
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


    onOwnerClick() {
        app.eventListener.dispatch(MacroEventType.ShowView, { viewName: MacroViewType.PageOwner })
    }

}

class MapRight extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.UpdateSurround, this, this.update.bind(this))
    }

    componentWillUnmount() {
        app.eventListener.logout(MacroEventType.UpdateSurround, this)
    }

    update() {
        this.setState({})
    }

    checkState(info) {
        const current = {
            showHouseMarket: !info,
            showEnvMarket: !info,
            showMove: !info,
        }
        return current
    }

    render() {
        const info = app.ownership.getLandInfo(this.props.selectedGrid)
        const current = this.checkState(info)
        const landImg = info
            ? <div className='map-right-owned-div'>
                <img className='map-right-owned' src={`/images/${getById(info.id).img}`} />
            </div>
            : <div className='map-right-owned-div'></div>

        return <div className='map-right'>
            <p>{`Land: (${this.props.selectedGrid.r}, ${this.props.selectedGrid.c})`}</p>
            {landImg}

            <div className='map-right-icon' >
                <img onClick={this.onMarketClick.bind(this)} src='/images/sale.png'></img>
                {current.showHouseMarket ? null : <div className='icon-cover'></div>}
            </div>
            <div className='map-right-icon' >
                <img src='/images/garden-icon.png' onClick={this.onENVClick.bind(this)}></img>
                {current.showEnvMarket ? null : <div className='icon-cover'></div>}
            </div>
            <div className='map-right-icon' >
                <img src='/images/travel.png' onClick={this.onMoveClick.bind(this)}></img>
                {current.showMove ? null : <div className='icon-cover'></div>}
            </div>
        </div>
    }

    onMarketClick() {
        app.eventListener.dispatch(MacroEventType.ShowView,
            { viewName: MacroViewType.PageMarket, viewArgs: this.props.selectedGrid }
        )
    }

    onMoveClick() {
        app.eventListener.dispatch(MacroEventType.ShowView,
            { viewName: MacroViewType.PageMove, viewArgs: this.props.selectedGrid }
        )
    }

    onENVClick() {
        app.eventListener.dispatch(MacroEventType.ShowView,
            { viewName: MacroViewType.PageENV, viewArgs: this.props.selectedGrid }
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

class LittleMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        if (!this.state.active) return null
        return <div className='little-map'>
            {this.renderSelect()}
            {this.renderHome()}
        </div>
    }

    renderHome() {
        if (!app.player.hasHouse()) return null
        const homePos = this.calLittlePos(app.player.houseData.row, app.player.houseData.col)
        const homeStyle = {
            position: 'absolute',
            left: `${homePos.x}px`,
            top: `${homePos.y}px`,
        }
        return < div className='little-map-home' style={homeStyle} ></div>

    }

    renderSelect() {
        if (!this.props.selectedGrid) return null
        const selectPos = this.calLittlePos(this.props.selectedGrid.r, this.props.selectedGrid.c)
        const selectStyle = {
            position: 'absolute',
            left: `${selectPos.x}px`,
            top: `${selectPos.y}px`,
        }
        return <div className='little-map-select' style={selectStyle}></div>
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.PlayerMode, this, this.activeSelf.bind(this))
    }

    activeSelf() {
        this.setState({
            active: true
        })
    }

    calLittlePos(r, c) {
        const landPos = LandPos.gridMiddleInLandPos(r, c)
        const ratio = MacroMap.CanvasWidth / (MacroMap.HouseSize * MacroMap.ColNum)
        const littleX = landPos.x * ratio
        const littleY = landPos.y * ratio
        return { x: littleX, y: littleY }
    }
}

export {
    MapFace,
    MapBottom,
    MapRight,
    MapLogo,
    LittleMap,
}