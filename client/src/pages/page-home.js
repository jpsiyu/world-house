import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUpTop } from './page-widgets'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
    }

    whenNoHouse() {
        return <div className='no-house'>
            <p>You don't have one, go to the market and buy one!</p>
        </div>
    }

    whenOwnedHouse(houseData) {
        return <div className='owned-house'>
            <div className='owned-house-item'>
                <img src='/images/house1.png'></img>
                <p>Position: [{houseData.row}, {houseData.col}]</p>
            </div>
        </div>
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
}

export default PageHome
