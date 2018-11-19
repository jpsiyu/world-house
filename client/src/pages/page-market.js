import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { log, logError, notice } from '../utils'
import { PopUpTop } from './page-widgets'
import { houseConfig } from '../house-config'

class PageMarket extends React.Component {
    constructor(props) {
        super(props)
        this.grid = props.viewArgs
        this.waitTimer = null
    }

    onCloseClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
    }


    onPurchaseClick(houseId) {
        if (app.player.hasHouse()) {
            notice('Anybody can only buy one house!')
            return
        }
        const price = app.priceSystem.getPriceWithConfigId(houseId)
        app.contractMgr.worldHouse.buyHouse(this.grid.r, this.grid.c, houseId, price.housePrice)
            .then(res => {
                log(res)
                this.waitForReceipt(res.tx)
            })
            .catch(err => {
                logError(err.name, err.message, err.stack)
                notice(err.message)
            })
    }

    waitForReceipt(tx) {
        this.waitTimer = setInterval(() => {
            app.contractMgr.getReceipt(tx)
                .then(receipt => {
                    log(receipt)
                    clearInterval(this.waitTimer)
                })
                .then(() => {
                    return app.player.updateHouseData()
                })
                .then(() => {
                    app.eventListener.dispatch(MacroEventType.BuyHouse)
                    notice('You buy a house!', () => {
                        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
                    })
                })
        }, 1000)
    }

    houseItemList() {
        const itemList = []
        for (let i = 0; i < houseConfig.length; i++) {
            const conf = houseConfig[i]
            const price = app.priceSystem.getPriceWithConfigId(conf.id)
            const houseId = conf.id
            const item = <div className='market-item' key={i}>
                <img src={`/images/${conf.img}`}></img>
                <span>Price: {price.housePriceEth}<p>ETH</p></span>
                <button onClick={() => { this.onPurchaseClick(houseId) }}>Purchase</button>
            </div>
            itemList.push(item)
        }
        return itemList
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Market' viewType={MacroViewType.PageMarket} />
                <div className='popup-content'>
                    <div className='market-location'><p>Build your house On land: ({`${this.grid.r}, ${this.grid.c}`})</p></div>
                    <div className='market-content'>
                        {this.houseItemList()}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default PageMarket
