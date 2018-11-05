import contract from 'truffle-contract'
import Web3 from 'web3'

class SolMgr {
    constructor() {
        this.web3 = this.createWeb3Instance()
    }

    createWeb3Instance() {
        let web3Provider
        if(window.metamask.isInstall()){
            const metamaskWeb3 = window.metamask.getWeb3()
            web3Provider = metamaskWeb3.currentProvider
        } else {
            web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
        }
        const web3 = new Web3(web3Provider)
        return web3
    }
}

export default SolMgr