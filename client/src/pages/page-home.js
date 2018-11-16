import React from 'react'
import { MacroMap, MacroViewType } from '../macro'
import { PopUpTop } from './page-widgets'
import { getById } from '../house-config'
import { logError } from '../utils'
import { surround } from '../drawing/draw-util'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            neighbor: 0,
            happiness: 0,
        }
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='My House' viewType={MacroViewType.PageHome} />
                <div className='popup-content'>
                    {app.player.hasHouse() ? this.whenOwnedHouse(app.player.houseData) : this.whenNoHouse()}
                </div>
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
                const happiness = this.happinessFormular(neighbor)
                this.setState({
                    neighbor: neighbor,
                    happiness: happiness,
                })
            })
            .catch(err => logError(err))
    }

    happinessFormular(x) {
        const y = (-6 / 15) * (x * x) + 12 * x + 10
        return Math.round(y * 10) / 10
    }

    whenNoHouse() {
        return <div className='no-house'>
            <p>You don't have one, go to the market and buy one!</p>
        </div>
    }

    whenOwnedHouse(houseData) {
        const conf = getById(houseData.id)
        return <div className='owned-house'>
            <div className='owned-house-top'>
                <div className='owned-house-top-left'>
                    <img src={`/images/${conf.img}`}></img>
                </div>
                <div className='owned-house-top-right'>
                    <p>Land: ({houseData.row}, {houseData.col})</p>
                </div>
            </div>
            <div className='owned-house-bottom'>
                <p>{`Neighbor Count: ${this.state.neighbor}`}</p>
                <p>Happiness: {this.state.happiness}</p>
            </div>
        </div>
    }
}

export default PageHome
