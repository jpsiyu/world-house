import React from 'react'
import { MacroEventType, MacroViewType } from './macro'

class LoginGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = props.viewArgs.check
    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.LoginGuide)
    }

    render() {
        const yesno = (checkRes) => {
            return checkRes
                ? <img className='yesno' src='/images/yes.png'></img>
                : <img className='yesno' src='/images/no.png'></img>
        }

        return <div className='overflow'>
            <div className='popup'>
                <div className='popup-top'>
                    <h2>Login with MetaMask account.</h2>
                    <button className='popup-close' onClick={this.onCloseClick.bind(this)}>
                        <p>Close</p>
                    </button>
                </div>
                <div className='popup-content'>
                    <div className='popup-item'>
                        <img className='guide-img-rect' src='/images/browser.png'></img>
                        <p>Chrome or Firefox</p>
                        {yesno(this.state.browserCheck)}
                    </div>
                    <div className='popup-item'>
                        <img className='guide-img-square' src='/images/metamask.png'></img>
                        <p>MetaMask Extension</p>
                        {yesno(this.state.extensionCheck)}
                    </div>
                    <div className='popup-item'>
                        <img className='guide-img-rect' src='/images/metamask-login.png'></img>
                        <p>Login MetaMask</p>
                        {yesno(this.state.unlockCheck)}
                    </div>
                    <div className='popup-item'>
                        <div className='mainnet-guide'>
                            <div className='circle'></div>
                            <p>Private Network</p>
                        </div>
                        <p>Choose Private Net</p>
                        {yesno(this.state.networkCheck)}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginGuide