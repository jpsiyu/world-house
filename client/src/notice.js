import React from 'react'
import { MacroEventType } from './macro'

class Notice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            msg: '',
            callback: null,
        }
    }

    render() {
        if (!this.state.active) return null
        return <div className='notice'>
            <div className='notice-container'>
                <div className='notice-title'>
                    <p>Notice</p>
                </div>
                <div className='notice-desc'>
                    <p>{this.state.msg}</p>
                </div>
                <div className='notice-btn'>
                    <button className='btn-shadow' onClick={this.onBtnSureClick.bind(this)}>Sure</button>
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.Notice, this, this.receiveNotice.bind(this))
    }

    receiveNotice({ msg, callback }) {
        this.setState({
            active: true,
            msg: msg,
            callback, callback,
        })
    }

    onBtnSureClick() {
        if (this.state.callback)
            this.state.callback()

        this.setState({
            active: false,
            msg: '',
            callback: null,
        })
    }
}

export default Notice