import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop, MarketGuide } from './page-widgets'
import { log, logError, notice } from '../utils'
import { getById } from '../house-config'

const ViewState = {
    NoHouse: 1,
    HasHouse: 2,
}

class PageMove extends React.Component {
    constructor(props) {
        super(props)
        this.grid = props.viewArgs
        this.waitTimer = null
        this.state = {
            viewState: this.checkState()
        }
    }

    render() {
        return <PopUp>
            <PopUpTop title='House Move' viewType={MacroViewType.PageMove} />
            {this.state.viewState == ViewState.HasHouse
                ? this.renderHasHouse()
                : <PopUpContent><MarketGuide /></PopUpContent>
            }
        </PopUp>
    }

    renderHasHouse() {
        const conf = getById(app.player.houseData.id)
        const imgName = conf.img
        return <PopUpContent>
            <div className='move-content'>
                <div className='move-house'>
                    <img className='move-img' src={`/images/${imgName}`} />
                    <p>From ({app.player.houseData.row}, {app.player.houseData.col})</p>
                </div>
                <img className='move-mid-img' src='/images/house-move.png' />
                <div className='move-house'>
                    <img className='move-img' src={`/images/${imgName}`} />
                    <p>To ({this.grid.r}, {this.grid.c})</p>
                </div>
            </div>
            <button className='btn-violet btn-large btn-shadow' onClick={this.onBtnMoveClick.bind(this)}>Move</button>
        </PopUpContent>
    }


    checkState() {
        return app.player.hasHouse() ? ViewState.HasHouse : ViewState.NoHouse
    }

    onBtnMoveClick() {
        app.contractMgr.worldHouse.moveHouse(this.grid.r, this.grid.c)
            .then((res) => {
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
                    app.eventListener.dispatch(MacroEventType.HouseMove)
                    notice('House Move Success!', () => {
                        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageMove)
                    })
                })
        }, 1000)
    }
}

export default PageMove
