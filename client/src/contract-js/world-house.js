import contract from 'truffle-contract'
import WorldHouseArtifact from '../../../build/contracts/WorldHouse.json'
import { log, logError } from '../utils'

class WorldHouse {
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
                })
                .then(resolve)
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

    buyHouse(row, col, houseId, price) {
        const account = app.metamask.account
        return this.instance.buyHouse(row, col, houseId, { from: account, value:price })
    }

    buyEnv(row, col, houseId, price){
        const account = app.metamask.account
        return this.instance.buyEnv(row, col, houseId, { from: account, value:price })
    }

    getLandOwners(rows, cols) {
        const account = app.metamask.account
        return this.instance.getLandOwners(rows, cols, { from: account })
    }

    getHouses(owners) {
        const account = app.metamask.account
        return this.instance.getHouses(owners, { from: account })
    }

    getEnvs(rows, cols){
        const account = app.metamask.account
        return this.instance.getEnvs(rows, cols, { from: account })
    }

    moveHouse(row, col) {
        const account = app.metamask.account
        return this.instance.move(row, col, { from: account })
    }

    getBasePrice() {
        const account = app.metamask.account
        return this.instance.getBasePrice({ from: account })
    }

    isOwner(){
        const account = app.metamask.account
        return this.instance.isOwner({ from: account })
    }

    getBalance() {
        const account = app.metamask.account
        return this.instance.getBalance({ from: account })
    }

    withdraw(){
        const account = app.metamask.account
        return this.instance.withdraw({ from: account })
    }
}

export default WorldHouse