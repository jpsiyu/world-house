import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'

class PageMarket extends React.Component {
    constructor(props) {
        super(props)
    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <div className='popup-top'>
                    <h2>House Markt</h2>
                    <button className='popup-close' onClick={this.onCloseClick.bind(this)}>
                        <p>Close</p>
                    </button>
                </div>
                <div className='popup-content'>
                    <p>HaHa</p>
                </div>
            </div>
        </div>
    }
}

export default PageMarket
