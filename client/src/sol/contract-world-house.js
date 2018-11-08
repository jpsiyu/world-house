import contract from 'truffle-contract'
import WorldHouseArtifact from '../../../build/contracts/WorldHouse.json'
import { log } from '../utils'

class ContractWorldHouse {
    constructor() {
        this.instance = null
    }

    init(provider) {
        const worldHouse = contract(WorldHouseArtifact)
        worldHouse.setProvider(provider)
        return worldHouse.deployed()
    }

    setInstance(instance) {
        this.instance = instance
    }

    greet() {
        return this.instance.greet()
    }

    getHouse() {
        return this.instance.getHouse()
    }

    buyHouse(row, col){
        const account = app.metamask.account
        return this.instance.buyHouse(row, col, {from: account})
    }
}

export default ContractWorldHouse