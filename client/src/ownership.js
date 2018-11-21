import { MacroMap } from './macro'
import { surround } from './drawing/draw-util'
import { logError } from './utils'

class Ownership {
    constructor() {
        this.center = { r: 0, c: 0 }
        this.owners = {
            '0x101': { land: { r: 0, c: 1 }, id: 1 },
            '0x102': { land: { r: 2, c: 2 }, id: 2 },
            '0x103': { land: { r: 3, c: 5 }, id: 1 },
            '0x104': { land: { r: 4, c: 4 }, id: 2 },
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

    addOwner(address, r, c, id = 1) {
        this.owners[address] = { land: { r, c }, id }
    }

    getSurroundInfo() {
        return new Promise((resolve, reject) => {
            const sur = surround(this.center.r, this.center.c, MacroMap.Surround)
            const addresses = []
            app.contractMgr.worldHouse.getLandOwners(sur.rows, sur.cols)
                .then(res => {
                    this.clearOwners()
                    let address
                    for (let i = 0; i < res.length; i++) {
                        address = res[i]
                        if (address == 0) continue
                        else {
                            addresses.push(address)
                            this.addOwner(address, sur.rows[i], sur.cols[i])
                        }
                    }
                })
                .then(() => {
                    return app.contractMgr.worldHouse.getHouses(addresses)
                })
                .then(ids => {
                    addresses.forEach((addr, idx) => {
                        this.owners[addr].id = ids[idx].toNumber()
                    })
                })
                .then(() => {
                    return app.contractMgr.worldHouse.getEnvs(sur.rows, sur.cols)
                })
                .then(res => {
                    for (let i = 0; i < res.length; i++) {
                        const envId = res[i]
                        if (envId == 0) continue
                        this.addOwner(`root-${sur.rows[i]}-${sur.cols[i]}`, sur.rows[i], sur.cols[i], envId)
                    }
                })
                .then(resolve)
                .catch(err => logError(err))
        })
    }

    getLandInfo({ r, c }) {
        let land
        let target = null
        Object.keys(this.owners).forEach(key => {
            land = this.owners[key].land
            if (land.r == r && land.c == c)
                target = key
        })
        return target ? this.owners[target] : null
    }
}

export default Ownership