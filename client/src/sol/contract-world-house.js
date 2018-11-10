import contract from 'truffle-contract'
import WorldHouseArtifact from '../../../build/contracts/WorldHouse.json'
import { log, logError } from '../utils'

class ContractWorldHouse {
    constructor() {
        this.instance = null
    }

    init(provider) {
        return new Promise((resolve, reject) => {
            const worldHouse = contract(WorldHouseArtifact)
            worldHouse.setProvider(provider)
            worldHouse.deployed()
                .then(instance => {
                    this.instance = instance
                    resolve(instance)
                })
                .catch(err => logError(err))
        })
    }

    greet() {
        return this.instance.greet()
    }

    getHouse() {
        const account = app.metamask.account
        return this.instance.getHouse({ from: account })
    }

    buyHouse(row, col) {
        const account = app.metamask.account
        return this.instance.buyHouse(row, col, { from: account })
    }

    getGridInfos(row, col){
        const account = app.metamask.account
        return this.instance.getGridInfos(row, col, { from: account })
    }
}

export default ContractWorldHouse