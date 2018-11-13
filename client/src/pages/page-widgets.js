import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'

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

export {
    PopUpTop,
}