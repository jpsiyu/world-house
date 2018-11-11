import ImageMgr from './image-mgr'
import Ownership from './ownership'
import Metamask from './metamask'
import EventListener from './event-listener'
import ContractMgr from './sol/contract-mgr'
import Player from './player'
import { log, logError } from './utils'

class App {
    constructor() { }

    init() {
        this.imageMgr = new ImageMgr()
        this.ownership = new Ownership()
        this.metamask = new Metamask()
        this.eventListener = new EventListener()
        this.contractMgr = new ContractMgr()
        this.player = new Player()
    }

    start(render) {
        this.imageMgr.loadImages().then(render)
    }

    enterPlayerMode() {
        this.contractMgr.getContractInstance()
            .then( () => {
                return this.player.updateHouseData()
            })
            .then(
                log('Enter Player Mode')
            )
            .catch(err => logError(err))
        this.metamask.checkIfAccountChange()
    }
}

export default App