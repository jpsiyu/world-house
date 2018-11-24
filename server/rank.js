const limit = 5

class RankInfo {
    constructor(owner, houseId, happiness, land) {
        this.owner = owner
        this.houseId = houseId
        this.happiness = happiness
        this.land = land
    }
}

class Rank {
    constructor() {
        this.rankList = []
    }

    add(info) {
        for (let i = 0; i < this.rankList.length; i++) {
            const record = this.rankList[i]
            if (info.owner == record.owner) {
                this.rankList[i] = record
                this.sortTopN()
                return
            }
        }

        if (this.rankList.length < limit) {
            this.rankList.push(info)
            this.sortTopN()
        } else {
            const last = this.rankList[this.rankList.length - 1]
            if (info.happiness > last.happiness) {
                this.rankList.push(info)
                this.sortTopN()
            }
        }
    }

    get() {
        return this.rankList
    }

    sortTopN() {
        this.rankList.sort((a, b) => {
            return b.happiness - a.happiness
        })
        if (this.rankList.length > limit)
            this.rankList = this.rankList.slice(0, limit)
    }
}

module.exports = {
    Rank,
    RankInfo,
}