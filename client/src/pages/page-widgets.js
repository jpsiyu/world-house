import React from 'react'
import { MacroEventType, MacroMap } from '../macro'
import { Line } from 'react-chartjs-2'
import { logError } from '../utils'
import { surround } from '../drawing/draw-util'

class PopUp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                {this.props.children}
            </div>
        </div>
    }
}

class PopUpContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='popup-content' >
            {this.props.children}
        </div >
    }
}

class PopUpTop extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='popup-top'>
            <h2>{this.props.title}</h2>
            <button className='popup-close' onClick={this.onCloseClick.bind(this)}>
                <p>X</p>
            </button>
        </div>

    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, this.props.viewType)
    }
}

class HappinessFormula extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            neighbor: 0,
            happiness: 0,
        }
    }

    render() {
        return <div className='formula'>
            <div className='formula-desc'>
                <div className='formula-desc-pair'>
                    <p>Neighbor Count</p>
                    <p>{this.state.neighbor}</p>
                </div>
                <div className='formula-desc-pair'>
                    <p>Happiness</p>
                    <p>{this.state.happiness}</p>
                </div>
            </div>
            <div className='formula-chart'>
                <Line data={this.genLineData()} />
            </div>
        </div>
    }

    componentDidMount() {
        if (!app.player.houseData) return
        const neighbor = surround(app.player.houseData.row, app.player.houseData.col, MacroMap.Neighbor)
        const addresses = []
        app.contractMgr.worldHouse.getLandOwners(neighbor.rows, neighbor.cols)
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    const address = res[i]
                    if (address == 0) continue
                    else {
                        addresses.push(address)
                    }
                }
            })
            .then(() => {
                const neighbor = addresses.length - 1
                const happiness = this.happinessFormula(neighbor)
                this.setState({
                    neighbor: neighbor,
                    happiness: happiness,
                })
            })
            .catch(err => logError(err))
    }

    happinessFormula(x) {
        const y = (-6 / 15) * (x * x) + 12 * x + 10
        return Math.round(y * 10) / 10
    }

    genLineData() {
        const x = []
        const y = []
        for (let i = 0; i < 25; i++) {
            x.push(i)
            y.push(this.happinessFormula(i))
        }
        return {
            labels: x,
            datasets: [
                {
                    type: 'line',
                    label: 'Happiness Neighbor Relationship',
                    data: y,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: 'green',
                    borderColor: 'green',
                },
                {
                    type: 'scatter',
                    data: [{ x: this.state.neighbor, y: this.happinessFormula(this.state.neighbor) }],
                    radius: 8,
                    backgroundColor: 'blueviolet',
                    borderColor: 'blueviolet',
                    label: 'Current',
                }
            ]
        }
    }
}

class MarketGuide extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='rule-guide-container'>
            <p>You don't have a house, go to the market and buy one!</p>
            <img src='/images/market-guide.png'></img>
        </div>
    }

}

class MarketItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const conf = this.props.conf
        const onPurchaseClick = this.props.onPurchaseClick
        const price = app.priceSystem.getPriceWithConfigId(conf.id)
        return <div className='market-item'>
            <div className='item-name'><p>{conf.name}</p></div>
            <img src={`/images/${conf.img}`}></img>
            <div className='market-price'>
                <img src='/images/eth.png'></img>
                <span>{price.housePriceEth}<p>ETH</p></span>
            </div>
            <button className='btn-green btn-large btn-shadow' onClick={onPurchaseClick}>Purchase</button>
        </div>
    }
}
export {
    PopUp,
    PopUpTop,
    PopUpContent,
    HappinessFormula,
    MarketGuide,
    MarketItem,
}