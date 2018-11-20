import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { log, logError, notice } from '../utils'
import { PopUpTop, MarketGuide, OneGuide } from './page-widgets'
import { houseConfig } from '../house-config'

const ViewState = {
    NoHouseNotSelected: 1,
    NoHouseSelected: 2,
    HasHouse: 3,
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
        else if (this.grid)
            return ViewState.NoHouseSelected
        else
            return ViewState.NoHouseNotSelected
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

    renderContainer() {
        switch (this.state.viewState) {
            case ViewState.HasHouse:
                return <div className='popup-content'>
                    <OneGuide />
                </div>
            case ViewState.NoHouseNotSelected:
                return <div className='popup-content'>
                    <MarketGuide />
                </div>
            case ViewState.NoHouseSelected:
                return this.renderNoHouseSelected()
            default:
                return <div className='popup-content'></div>
        }

    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Market' viewType={MacroViewType.PageMarket} />
                {this.renderContainer()}
            </div>
        </div>
    }

    renderNoHouseSelected() {
        return <div className='popup-content'>
            <div className='market-location'><p>Build your house On land: ({`${this.grid.r}, ${this.grid.c}`})</p></div>
            <div className='market-content'>
                {this.houseItemList()}
            </div>
        </div>
    }
}

export default PageMarket
