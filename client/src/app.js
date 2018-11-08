import ImageMgr from './image-mgr'
import Ownership from './ownership'
import Metamask from './metamask'
import EventListener from './event-listener'
import ContractMgr from './sol/contract-mgr'
import Player from './player'
import { log } from './utils'

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

    start(render){
        this.imageMgr.loadImages().then(render)
    }

    run(success, fail) {
        this.imageMgr.loadImages()
            .then(() => {
                return this.contractMgr.worldHouse.init(this.contractMgr.provider)
            })
            .then((instance) => {
                this.contractMgr.worldHouse.setInstance(instance)
                return this.contractMgr.worldHouse.getHouse()
            })
            .then(houseData => {
                this.player.setHouseData(houseData)
                success()
            })
            .catch(err => {
                log(err.name, err.message, err.stack)
                fail()
            })
    }
}

export default App