import React from 'react'
import {MacroEventType, MacroViewType} from './macro'

class LoginGuide extends React.Component{
    constructor(props){
        super(props)
        const check = props.viewArgs.check
        this.state = {
            browserCheck : check.browserCheck,
            extensionCheck : check.extensionCheck,
            loginCheck : check.loginCheck,
        }
    }

    onCloseClick(){
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.LoginGuide)
    }

    render(){
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
                        <img src='/images/browser.png'></img>
                        <p>1. Use Chrome or Firefox</p>
                        {yesno(this.state.browserCheck)}
                    </div>
                    <div className='popup-item'>
                        <img src='/images/metamask.png'></img>
                        <p>2. Install MetaMask extension</p>
                        {yesno(this.state.extensionCheck)}
                    </div>
                    <div className='popup-item'>
                        <img src='/images/metamask-login.png'></img>
                        <p>3. Login MetaMask</p>
                        {yesno(this.state.loginCheck)}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginGuide