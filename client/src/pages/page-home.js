import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop, MarketGuide } from './page-widgets'
import { getById } from '../house-config'
import { HappinessFormula } from './page-widgets'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <PopUp>
            <PopUpTop title='My House' viewType={MacroViewType.PageHome} />
            <PopUpContent>
                {app.player.hasHouse() ? this.whenOwnedHouse(app.player.houseData) : <MarketGuide />}
            </PopUpContent>
        </PopUp>
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
                    <button className='btn-mid btn-violet btn-shadow' onClick={this.onBtnJumpClick.bind(this)}>Jump</button>
                </div>
            </div>
            <div className='owned-house-bottom'>
                <HappinessFormula />
            </div>
        </div>
    }

    onBtnJumpClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageHome)
        app.eventListener.dispatch(
            MacroEventType.Center2Grid,
            {
                r: app.player.houseData.row,
                c: app.player.houseData.col,
            }
        )
    }
}

export default PageHome
