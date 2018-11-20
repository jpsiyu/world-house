import { HouseType } from './macro'

const houseConfig = [
    { id: 1, type: HouseType.House, img: 'house1.png', priceRatio: 1 },
    { id: 2, type: HouseType.House, img: 'house2.png', priceRatio: 1.2 },
    { id: 100, type: HouseType.Env, img: 'garden.png', priceRatio: 2.0 },
]

const getById = (id) => {
    let conf
    for (let i = 0; i < houseConfig.length; i++) {
        if (houseConfig[i].id == id) {
            conf = houseConfig[i]
            break
        }
    }
    return conf
}


export {
    houseConfig,
    getById,
}