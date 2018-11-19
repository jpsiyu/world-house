import ImageMgr from './image-mgr'
import Ownership from './ownership'
import Metamask from './metamask'
import EventListener from './event-listener'
import ContractMgr from './contract-js/contract-mgr'
import Player from './player'
import PriceSystem from './price-system'
import { log, logError, notice } from './utils'
import { MacroEventType } from './macro'

class App {
    constructor() {
        this.playerMode = false
    }

    init() {
        this.imageMgr = new ImageMgr()
        this.ownership = new Ownership()
        this.metamask = new Metamask()
        this.eventListener = new EventListener()
        this.contractMgr = new ContractMgr()
        this.player = new Player()
        this.priceSystem = new PriceSystem()
    }

    start(render) {
        this.imageMgr.loadImages().then(render)
    }

    enterPlayerMode() {
        this.contractMgr.getContractInstance()
            .then(() => {
                return this.player.updateHouseData()
            })
            .then(() => {
                return this.contractMgr.worldHouse.getBasePrice()
            })
            .then(price => {
                this.priceSystem.setPrice(price)
            })
            .then(() => {
                this.eventListener.dispatch(MacroEventType.DrawCloudEffect)
                this.playerMode = true
                this.eventListener.dispatch(MacroEventType.PlayerMode)
                log('Enter Player Mode')
            })
            .catch(err => logError(err))
        this.metamask.checkIfAccountChange()
    }
}

export default App