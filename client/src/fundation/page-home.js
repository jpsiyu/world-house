import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageHome)
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
                <div className='popup-top'>
                    <h2>My House</h2>
                    <button className='popup-close' onClick={this.onCloseClick.bind(this)}>
                        <p>Close</p>
                    </button>
                </div>
                <div className='popup-content'>
                    {app.player.hasHouse() ? this.whenOwnedHouse(app.player.houseData) : this.whenNoHouse()}
                </div>
            </div>
        </div>
    }
}

export default PageHome
