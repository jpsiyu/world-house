import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
    }

    onCloseClick() {
        window.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageHome)
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
                    <p>HaHa</p>
                </div>
            </div>
        </div>
    }
}

export default PageHome
