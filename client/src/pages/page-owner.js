import React from 'react'
import { MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop } from './page-widgets'
import { log, logError, notice } from '../utils'

class PageOwner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: 0,
            balanceEth: 0,
        }
        this.waitTimer = null
    }

    render() {
        return <PopUp>
            <PopUpTop title='Owner' viewType={MacroViewType.PageOwner} />
            <PopUpContent>
                <div className='owner-container'>
                    <p>Contract Balance: {this.state.balanceEth} eth</p>
                    <button className='btn-shadow' onClick={this.onBtnWithdrawClick.bind(this)}>Withdraw</button>
                </div>
            </PopUpContent>
        </PopUp>
    }

    componentDidMount() {
        app.contractMgr.worldHouse.getBalance()
            .then(balance => {
                this.setState({
                    balance: balance,
                    balanceEth: app.contractMgr.fromWei(balance.toString()),
                })
            })
    }

    onBtnWithdrawClick() {
        app.contractMgr.worldHouse.withdraw()
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
                    notice('Withdraw success!')
                })
        }, 1000)
    }

}

export default PageOwner
