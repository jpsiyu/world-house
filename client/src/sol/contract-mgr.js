import Web3 from 'web3'
import ContractWorldHouse from './contract-world-house'
import { logError } from '../utils'

class ContractMgr {
    constructor() {
        this.provider = this.getProvider()
        this.web3 = new Web3(this.provider)
        this.worldHouse = new ContractWorldHouse(this.provider)
    }

    getProvider() {
        let provider = null
        if (app.metamask.isInstall()) {
            const metamaskWeb3 = app.metamask.getWeb3()
            provider = metamaskWeb3.currentProvider
        }
        return provider
    }

    getNetworkId() {
        return this.web3.eth.net.getId()
    }

    getContractInstance() {
        return this.worldHouse.init(this.provider)
    }

    getReceipt(tx) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getTransactionReceipt(tx, (err, result) => {
                if (err != null) reject(err)
                else resolve(result)
            })
        })
    }

    fromWei(num) {
        return this.web3.utils.fromWei(num)
    }

}

export default ContractMgr