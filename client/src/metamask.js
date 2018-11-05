
class Metamask {
    constructor() {

    }

    isInstall() {
        return typeof web3 != 'undefined'
    }

    getWeb3(){
        return web3
    }

    isLocked() {
        return new Promise((resolve, reject) =>
            web3.eth.getAccounts((err, accounts) => {
                let res = true
                if (err != null) {
                    console.log('Error:', err)
                    res = true
                } else if (accounts.length == 0) {
                    res = true
                } else {
                    res = false
                }
                resolve(res)
            })
        )
    }

    getAccount(){
        return web3.eth.accounts[0]
    }

    test(){
        if(this.isInstall()){
            this.isLocked().then(res => {
                if(res){
                    console.log('account is locked')
                }else{
                    console.log('accounts:', this.getAccount())
                }
            })
        }else{
            console.log('metamask not installed')
        }
    }
}

export default Metamask