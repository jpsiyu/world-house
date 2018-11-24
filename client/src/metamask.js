import { log, logError, notice } from './utils'
import { MacroNetworkType, MacroEventType } from './macro'

class Metamask {
    constructor() {
        this.account = null
        this.accountTimer = null
    }

    isSupportedBrowser() {
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isFirefox = typeof InstallTrigger !== 'undefined';
        return isChrome || isFirefox
    }

    isInstall() {
        return typeof web3 != 'undefined'
    }

    getAccount() {
        return new Promise((resolve, reject) => {
            let account = null
            if (!this.isInstall()) resolve(account)
            app.contractMgr.web3.eth.getAccounts()
                .then(accounts => {
                    if (accounts.length != 0)
                        account = accounts[0]
                    resolve(account)
                })
                .catch(err => logError(err))
        })
    }

    canPlay() {
        return new Promise((resolve, reject) => {
            const res = {
                browserCheck: false,
                extensionCheck: false,
                unlockCheck: false,
                networkCheck: false,
            }
            res.browserCheck = this.isSupportedBrowser()
            res.extensionCheck = this.isInstall()

            this.getAccount()
                .then(account => {
                    if (account) {
                        this.account = account
                        res.unlockCheck = true
                    }
                })
                .then(() => {
                    if (res.unlockCheck) {
                        return app.contractMgr.getNetworkId()
                    }
                })
                .then(networkId => {
                    if (networkId == MacroNetworkType.Private) {
                        res.networkCheck = true
                    }
                })
                .then(() => {
                    resolve(res)
                })
                .catch(err => logError(err))
        })
    }

    getWeb3() {
        return web3
    }

    checkIfAccountChange() {
        this.accountTimer = setInterval(() => {
            app.contractMgr.web3.eth.getAccounts()
                .then(accounts => {
                    const account = accounts[0]
                    if (account != this.account) {
                        clearInterval(this.accountTimer)
                        notice('Account change, reload page!', () => { window.location.reload() })
                    }
                })
        }, 5000)
    }
}

export default Metamask