import { MacroMap } from './macro'
import { surround } from './drawing/draw-util'
import { logError } from './utils'

class Ownership {
    constructor() {
        this.center = { r: 0, c: 0 }
        this.owners = {
            '0x101': { land: { r: 0, c: 1 }, house: 'house1' },
            '0x102': { land: { r: 2, c: 2 }, house: 'house2' },
            '0x103': { land: { r: 3, c: 5 }, house: 'house1' },
            '0x104': { land: { r: 4, c: 4 }, house: 'house2' },
        }
    }

    getOwners() {
        return this.owners
    }

    clearOwners() {
        this.owners = {}
    }

    setCenter(grid) {
        const same = this.center.r == grid.r && this.center.c == grid.c
        if (!same)
            this.center = grid
        return !same
    }

    addOwner(address, r, c) {
        this.owners[address] = { land: { r, c }, house: 'house1' }
    }

    getSurroundInfo() {
        return new Promise((resolve, reject) => {
            const sur = surround(this.center.r, this.center.c, MacroMap.Surround)
            app.contractMgr.worldHouse.getGridInfos(sur.rows, sur.cols)
                .then(res => {
                    this.clearOwners()
                    let address
                    for (let i = 0; i < res.length; i++) {
                        address = res[i]
                        if (address == 0) continue
                        else this.addOwner(address, sur.rows[i], sur.cols[i])
                    }
                    resolve()
                })
                .catch(err => logError(err))
        })
    }

    getLandOwner({r, c}){
        let land
        let target = null
        Object.keys(this.owners).forEach( key => {
            land = this.owners[key].land
            if(land.r == r && land.c == c)
                target = key
        })
        return target
    }
}

export default Ownership