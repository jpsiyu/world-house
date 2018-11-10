import {logError} from './utils'

class Player {
    constructor() {
        this.houseData = null
    }

    setHouseData(data){
        this.houseData = {
            row: data[0].toNumber(),
            col: data[1].toNumber(),
            used: data[2],
        }
    }

    updateHouseData(){
        return new Promise((resolve, reject) => {
            app.contractMgr.worldHouse.getHouse()
                .then(houseData => {
                    this.setHouseData(houseData)
                    resolve(houseData)
                })
                .catch(err => logError(err))
        })
    }

    hasHouse(){
        if(!this.houseData) return false
        return this.houseData.used == 1
    }
}

export default Player