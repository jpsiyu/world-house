import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { log, logError } from '../utils'

class PageMarket extends React.Component {
    constructor(props) {
        super(props)
        this.waitTimer = null
    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
    }


    onPurchaseClick(houseType) {
        if (app.player.hasHouse()) {
            alert('Anybody can only buy one house!')
            return
        }
        app.contractMgr.worldHouse.buyHouse(2, 2)
            .then(res => {
                log(res)
                this.waitForReceipt(res.tx)
            })
            .catch(err => {
                logError(err.name, err.message, err.stack)
                alert(err.message)
            })
    }

    waitForReceipt(tx) {
        this.waitTimer = setInterval( () => {
            app.contractMgr.getReceipt(tx)
                .then(receipt => {
                    log(receipt)
                    clearInterval(this.waitTimer)
                    app.player.updateHouseData()
                    alert('You buy a house!')
                })
        }, 1000)
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <div className='popup-top'>
                    <h2>House Market</h2>
                    <button className='popup-close' onClick={this.onCloseClick.bind(this)}>
                        <p>Close</p>
                    </button>
                </div>
                <div className='popup-content'>
                    <div className='market-content'>
                        <div className='market-item'>
                            <img src='/images/house1.png'></img>
                            <p>Price: 0.01ETH</p>
                            <button onClick={() => { this.onPurchaseClick('house1') }}>Purchase</button>
                        </div>
                        <div className='market-item'>
                            <img src='/images/house2.png'></img>
                            <p>Price: 0.01ETH</p>
                            <button onClick={() => { this.onPurchaseClick('house2') }}>Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default PageMarket
