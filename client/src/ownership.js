class Ownership {
    constructor() {
        this.owners = {
            '0x101': { land: { r: 0, c: 1 }, house: 'house1' },
            '0x102': { land: { r: 2, c: 2 }, house: 'house2' },
            '0x103': { land: { r: 3, c: 5 }, house: 'house1' },
            '0x104': { land: { r: 4, c: 4 }, house: 'house2' },
        }
    }

    getOwners(){
        return this.owners
    }
}

export default Ownership