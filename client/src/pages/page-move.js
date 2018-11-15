import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUpTop } from './page-widgets'
import { log, logError } from '../utils'

class PageMove extends React.Component {
    constructor(props) {
        super(props)
        this.grid = props.viewArgs
        this.waitTimer = null
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='House Move' viewType={MacroViewType.PageMove} />
                <div className='popup-content'>
                    <div className='move-content'>
                        <div className='move-house'>
                            <img className='move-img' src='/images/house.png' />
                            <p>From ({app.player.houseData.row}, {app.player.houseData.col})</p>
                        </div>
                        <img className='move-mid-img' src='/images/house-move.png' />
                        <div className='move-house'>
                            <img className='move-img' src='/images/house.png' />
                            <p>To ({this.grid.r}, {this.grid.c})</p>
                        </div>
                    </div>
                    <button className='move-btn btn-shadow' onClick={this.onBtnMoveClick.bind(this)}>Move</button>
                </div>
            </div>
        </div>
    }

    onBtnMoveClick() {
        app.contractMgr.worldHouse.moveHouse(this.grid.r, this.grid.c)
            .then((res) => {
                log(res)
                this.waitForReceipt(res.tx)
            })
            .catch(err => {
                logError(err.name, err.message, err.stack)
                alert(err.message)
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
                    alert('House Move Success!')
                })
        }, 1000)
    }
}

export default PageMove
