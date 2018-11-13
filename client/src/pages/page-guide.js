import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUpTop } from './page-widgets'

class PageGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = props.viewArgs.check
    }

    componentDidMount() {
        let fail = -1
        Object.keys(this.state).forEach((key, i) => {
            if (!this.state[key] && fail == -1)
                fail = i

        })
        if (fail != -1) {
            const items = document.getElementsByClassName('guide-item')
            const item = items[fail]
            item.scrollIntoView({ behavior: "smooth" })
        }
    }

    render() {
        const yesno = (checkRes) => {
            return checkRes
                ? <img className='yesno' src='/images/yes.png'></img>
                : <img className='yesno' src='/images/no.png'></img>
        }

        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Set up' viewType={MacroViewType.PageGuide} />
                <div className='popup-content'>
                    <div className='guide-item'>
                        <div className='guide-item-left'>
                            <img className='guide-img-rect' src='/images/browser.png'></img>
                            <p>Step 1: Use Chrome or Firefox</p>
                        </div>
                        <div className='guide-item-right'>
                            {yesno(this.state.browserCheck)}
                        </div>
                    </div>
                    <div className='guide-item'>
                        <div className='guide-item-left'>
                            <img className='guide-img-square' src='/images/metamask.png'></img>
                            <p>Step 2: Install MetaMask Extension</p>
                        </div>
                        <div className='guide-item-right'>
                            {yesno(this.state.extensionCheck)}
                        </div>
                    </div>
                    <div className='guide-item'>
                        <div className='guide-item-left'>
                            <img className='guide-img-rect' src='/images/metamask-login.png'></img>
                            <p>Step 3: Sign in MetaMask</p>
                        </div>
                        <div className='guide-item-right'>
                            {yesno(this.state.unlockCheck)}
                        </div>
                    </div>
                    <div className='guide-item'>
                        <div className='guide-item-left'>
                            <div className='mainnet-guide'>
                                <div className='circle'></div>
                                <p>Private Network</p>
                            </div>
                            <p>Step 4: Switch to Private Net</p>
                        </div>
                        <div className='guide-item-right'>
                            {yesno(this.state.networkCheck)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default PageGuide