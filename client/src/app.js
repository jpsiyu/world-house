import ImageMgr from './image-mgr'
import Ownership from './ownership'
import Metamask from './metamask'
import EventListener from './event-listener'
import SolMgr from './sol/sol-mgr'

class App{
    constructor(){}

    init() {
        this.imageMgr = new ImageMgr()
        this.ownership = new Ownership()
        this.metamask = new Metamask()
        this.eventListener = new EventListener()
        this.solMgr = new SolMgr()
    }
}

export default App