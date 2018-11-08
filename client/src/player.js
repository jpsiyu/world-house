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

    hasHouse(){
        if(!this.houseData) return false
        return this.houseData.used
    }
}

export default Player