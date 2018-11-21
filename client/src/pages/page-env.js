import React from 'react'
import { PopUp, PopUpContent, PopUpTop, MarketItem } from './page-widgets'
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
        return <PopUp>
            <PopUpTop title='Environment' viewType={MacroViewType.PageMarket} />
            <PopUpContent>
                <div className='market-content'>
                    {this.envItemList()}
                </div>
            </PopUpContent>
        </PopUp>
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
                    notice('New enviroment builded!', () => {
                        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMarket)
                    })
                })
        }, 1000)
    }
}

export default PageENV