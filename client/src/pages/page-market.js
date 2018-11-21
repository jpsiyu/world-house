import React from 'react'
import { MacroEventType, MacroViewType, HouseType } from '../macro'
import { log, logError, notice } from '../utils'
import { PopUpTop, MarketItem } from './page-widgets'
import { houseConfig } from '../house-config'

const ViewState = {
    HasHouse: 1,
    NoHouse: 2,
}

class PageMarket extends React.Component {
    constructor(props) {
        super(props)
        this.grid = props.viewArgs
        this.waitTimer = null
        this.state = {
            viewState: this.checkState()
        }
    }

    checkState() {
        if (app.player.hasHouse())
            return ViewState.HasHouse
        else
            return ViewState.NoHouse
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
            if (conf.type != HouseType.House) continue
            const houseId = conf.id
            itemList.push(<MarketItem conf={conf} onPurchaseClick={() => this.onPurchaseClick(houseId)} key={i} />)
        }
        return itemList
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Market' viewType={MacroViewType.PageMarket} />
                {this.renderMarket()}
            </div>
        </div>
    }

    renderMarket() {
        return <div className='popup-content'>
            <div className='market-location'><p>Build your house On land: ({`${this.grid.r}, ${this.grid.c}`})</p></div>
            <div className='market-content'>
                {this.houseItemList()}
            </div>
        </div>
    }
}

export default PageMarket
