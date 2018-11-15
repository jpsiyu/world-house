import { getById } from './house-config'

class PriceSystem {
    constructor() {
        this.priceBN = null
        this.printN = null
    }

    setPrice(price) {
        this.priceBN = price
        this.printN = price.toNumber()
    }

    getPriceWithConfigId(id) {
        const conf = getById(id)
        const housePrice = this.printN * conf.priceRatio
        const housePriceEth = app.contractMgr.fromWei(housePrice.toString())
        return { housePrice, housePriceEth }
    }

}

export default PriceSystem