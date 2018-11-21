import React from 'react'
import { PopUpTop, MarketItem } from './page-widgets'
import { MacroEventType, MacroViewType, HouseType } from '../macro'
import { houseConfig } from '../house-config'
import { log, logError, notice } from '../utils'

class PageENV extends React.Component {
    constructor(props) {
        super(props)
        this.grid = props.viewArgs
        this.waitTimer = null
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Environment' viewType={MacroViewType.PageMarket} />
                {this.renderContainer()}
            </div>
        </div>
    }

    renderContainer() {
        return <div className='popup-content'>
            <div className='market-content'>
                {this.envItemList()}
            </div>
        </div>
    }

    envItemList() {
        const itemList = []
        for (let i = 0; i < houseConfig.length; i++) {
            const conf = houseConfig[i]
            if (conf.type != HouseType.Env) continue
            const houseId = conf.id
            itemList.push(<MarketItem conf={conf} onPurchaseClick={() => this.onPurchaseClick(houseId)} key={i} />)
        }
        return itemList
    }

    onPurchaseClick(houseId) {
        const price = app.priceSystem.getPriceWithConfigId(houseId)
        app.contractMgr.worldHouse.buyEnv(this.grid.r, this.grid.c, houseId, price.housePrice)
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
                    notice('You buy a env!', () => {
                        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
                    })
                })
        }, 1000)
    }
}

export default PageENV